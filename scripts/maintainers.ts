#!/usr/bin/env deno run --allow-env --allow-net

import { Octokit } from "@octokit/rest";

const org = "catppuccin";

const octokit = new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") });

type Table = {
  [person: string]: {
    write_repos: string[];
    maintain_repos: string[];
  };
};

const leadershipRow =
  "[Core](https://github.com/orgs/catppuccin/teams/core)/[Staff](https://github.com/orgs/catppuccin/teams/staff)";
const table: Table = {
  [leadershipRow]: {
    write_repos: [],
    maintain_repos: [],
  },
};

const fetchRepos = async () => {
  const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org,
    type: "public",
    per_page: 100,
  }, (response) => response.data.filter((repo) => !repo.archived));

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

const mapToTable = async (
  leadership: Set<string>,
  repoName: string,
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

    const repoRow = `[${repoName}](https://github.com/catppuccin/${repoName})`;

    const updateTable = (person: any, key: string) => {
      const name = `[${person.login}](${person.html_url})`;
      if (!table[name]) {
        table[name] = {
          write_repos: [],
          maintain_repos: [],
        };
      }
      if (table[name]) {
        table[name][key].push(repoRow);
      }
    };

    const maintainers = everyone.filter((m) => m.permissions?.maintain);
    const collaborators = everyone.filter((m) =>
      m.permissions?.push && !m.permissions?.maintain
    );

    maintainers.forEach((person: any) => updateTable(person, "maintain_repos"));
    collaborators.forEach((person: any) => updateTable(person, "write_repos"));

    if (maintainers.length === 0) {
      table[leadershipRow].maintain_repos.push(repoRow);
    }
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
for (const [i, repo] of allRepos.entries()) {
  console.log(`[${i + 1}]: processing repo '${repo.name}'`);
  await mapToTable(leadership, repo.name);
}

console.error("| Collaborator | `Maintain` Access | `Write` Access |");
console.error("| ---------- | ----------------- | -------------- |");
Object.entries(table)
  .sort()
  .forEach(([person, { write_repos, maintain_repos }]) => {
    console.error(
      `| ${person} | ${maintain_repos.join(", ")} | ${
        write_repos.join(", ")
      } |`,
    );
  });

export {};
