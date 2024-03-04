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
    <td align="center"><a href="https://github.com/isabelroses"><img src="https://avatars.githubusercontent.com/u/71222764?v=4" width="100px;" alt=""/><br /><sub><b>Isabel Roses</b></sub></a><br /></td>
  </tr>
</table>

## Introduction

Catppuccin is growing vastly daily and the documentation is no different. The
documentation in its current form, is designed on per repo level just isn't
cutting it, leading to a ping pong effect between repos. An example of a
repository that suffers from this is
[userstyles](https://github.com/catppuccin/userstyles).

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

This RFC proposes a better way to organize and present our documentation.
Winston's original suggestion prior to stepping down from core, was to start a
MediaWiki. Other proposals include using mdbook, wiki.js or a custom solution.

### Examples of wikis

#### MediaWiki

- [Catppuccin Test Wiki](https://ctp-wiki.isabelroses.com)
- [archwiki](https://wiki.archlinux.org)
- [nixos wiki](https://nixos.wiki)

#### mdbook

- [cargo](https://doc.rust-lang.org/cargo)
- [Mozilla telemetry](https://docs.telemetry.mozilla.org)

#### Others

- [php](https://www.php.net) - dokuwiki
- [bookstack demo](https://demo.bookstackapp.com) - bookstack
- [tailscale](https://tailscale.com/kb) - custom solution

### Pros

- All documentation in one place
- Easier to contribute to documentation
- Easier to find documentation
- Reduces repetition of information
- Moving to either Wikimedia or mdbook will mean only small changes to the
  current documentation, as mdbook is markdown based and Wikimedia can be
  converted to Markdown via [pandoc](https://pandoc.org)

### Cons

- We will need to host a wiki, this includes costs, maintenance, etc.
- We _might_ lose the searchability of markdown files

## Decision Made
