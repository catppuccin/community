#!/usr/bin/env deno run --allow-env --allow-net

import { Octokit } from "@octokit/rest";

const org = "catppuccin";

const octokit = new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") });

const fetchRepos = async () => {
  const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org,
    type: "public",
    per_page: 100,
  });

  return repos;
};

const fetchLeadership = async () => {
  const teams = ["core", "staff"];
  const result = await Promise.all(
    teams.map((team_slug) =>
      octokit.rest.teams.listMembersInOrg({
        org,
        team_slug,
      }).then((res) => res.data.map((m) => m.login.toLowerCase()))
    ),
  );
  return new Set(result.flat());
};

const fetchCollaborators = async (
  leadership: Set<string>,
  repoName: string,
  isArchived: boolean | undefined,
) => {
  try {
    const { data: rawData } = await octokit.rest.repos.listCollaborators({
      owner: org,
      repo: repoName,
      per_page: 100,
    });

    // Ignore all the leadership team and only care about people that can write to the repository.
    const everyone = rawData.filter((collaborator) =>
      !leadership.has(collaborator.login.toLowerCase()) &&
      collaborator.permissions?.push
    );

    // Just the people with `maintain` access.
    const maintainers = everyone.filter((m) => m.permissions?.maintain)
      .map((m) => `[${m.login}](${m.html_url})`)
      .join(", ");
    // Just the people with `write` access.
    const collaborators = everyone.filter((m) =>
      m.permissions?.push && !m.permissions?.maintain
    ).map((m) => `[${m.login}](${m.html_url})`).join(", ");

    const repoRow =
      `[${repoName}](https://github.com/catppuccin/${repoName})<br>${
        isArchived ? "(**🚧 Archived 🚧**)" : ""
      }`;
    // If there are no maintainers, then we assume that the core and staff teams are the maintainers.
    const maintainersRow = maintainers.length === 0
      ? "[Core](https://github.com/orgs/catppuccin/teams/core)/[Staff](https://github.com/orgs/catppuccin/teams/staff)"
      : maintainers;
    const collaboratorsRow = collaborators.length === 0 ? "" : collaborators;

    console.log(`| ${repoRow} | ${maintainersRow} | ${collaboratorsRow} |`);
  } catch (error) {
    console.log(
      `Unable to fetch collaborators for ${repoName}. Error: ${error.message}`,
    );
  }
};

console.log(`Fetching leadership team...`);
const leadership = await fetchLeadership();
console.log(`Fetching repositories...`);
const allRepos = await fetchRepos();
console.log(`Fetching maintainers for ${allRepos.length} repositories...`);

// NOTE: This started out as a simple stdout script, hence the console.logs
// TODO: Explicitly write to a file instead of piping to a file.
console.log("| Repository | `Maintain` Access | `Write` Access |");
console.log("| ---------- | ----------------- | -------------- |");
for (const repo of allRepos) {
  await fetchCollaborators(leadership, repo.name, repo.archived);
}

export {};
