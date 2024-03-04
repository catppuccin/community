# CAT-0004-Wiki.md

Date: **2024-02-04**

## Status

| Draft | In Review | Done |
| :---: | --------- | ---- |
|   ☑️   |           |      |

## Proposed By

<table>
  <tr>
    <td align="center"><a href="https://winston.sh/"><img src="https://avatars.githubusercontent.com/u/79978224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Winston</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/isabelroses"><img src="https://avatars.githubusercontent.com/u/71222764?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isabel Roses</b></sub></a><br /></td>
  </tr>
</table>

## Introduction

Catppuccin is growing vastly daily and the documentation is no different. The
documentation in its current form, is designed around being used on per repo
level, but that just isn't cutting it anymore. This leads to a ping pong effect
between repos, trying to find out information that you need for contributing. An
example of a repository that suffers from this is
[userstyles](https://github.com/catppuccin/userstyles).

Originally, Winston's suggestion prior to stepping down from core was to start a
MediaWiki, leading Isabel Roses to take over the proposal and create a demo see
[Catppuccin Test Wiki](https://ctp-wiki.isabelroses.com).

## Goals

- We help others get setup and working on ports faster
- Better organized documentation
- Centralization of information
- Avoid repeating information across repositories
- Better workflow for non staff members to contribute to documentation

## Non-Goals

- Reinvent a wiki platform
- Keep sending users between different websites and locations for documentation
- Move all repository specific information into the wiki

## Proposal

This RFC proposes a better way to organize and present our documentation. We
should ideally move to MediaWiki. However, we should also consider other wikis
such as mdBook, wiki.js or a custom solution.

### Existing wiki deployments

#### MediaWiki

- [Catppuccin Test Wiki](https://ctp-wiki.isabelroses.com)
- [archwiki](https://wiki.archlinux.org)
- [nixos wiki](https://nixos.wiki)

#### mdBook

- [cargo](https://doc.rust-lang.org/cargo)
- [Mozilla telemetry](https://docs.telemetry.mozilla.org)

#### Others

- [php](https://www.php.net) - dokuwiki
- [bookstack demo](https://demo.bookstackapp.com) - bookstack
- [tailscale](https://tailscale.com/kb) - custom solution

### Pros

- Centralisation and unification of organisation-wide docs
- Simplified and unified contribution flow, with permission system that is
  designed for wiki use
- Searching and referencing tools designed for wiki use will provide better
  information lookup experience
- Deduplicate information sources
- Minimal setup overhead
  - MediaWiki: our existing docs can be largely converted with
    [pandoc](https://pandoc.org)
  - mdBook: already a markdown sourced doc system, docs can be directly copied
    over

### Cons

- Costs to the org:
  - Server
  - Maintenance
  - Transfer effort
- Setup cost
- Increased complexity
- New tooling to learn, content creation friction
- Aesthetically different from our other public facing content (e.g website)
  - Would require additional effort to theme/style accordingly

## Decision Made
