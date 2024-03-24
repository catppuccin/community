# CAT-0003-Whiskers.md

Date: **2023-12-14**

## Status

| Draft | In Review | Done |
|:-----:|-----------|------|
|  ☑️   |           |      |

## Proposed By

<table>
<tr>
    <td align="center"><a href="https://github.com/sgoudham"><img src="https://avatars.githubusercontent.com/u/58985301?v=4" width="100px;" alt=""/><br /><sub><b>Hamothy</b></sub></a><br /></td>
    <td align="center"><a href="https://winston.sh/"><img src="https://avatars.githubusercontent.com/u/79978224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>winston</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/backwardspy"><img src="https://avatars.githubusercontent.com/u/289746" width="100px;" alt=""/><br /><sub><b>backwardspy</b></sub></a><br /></td>
</tr>
</table>

## Introduction

Catppuccin currently boasts over 250 ports in its real estate, ranging from full
mono-repositories with complex build systems and CI/CD workflows; simple 10 line
configuration files that need to copy/pasted into the user's home directory; and
"README repositories" that are nothing more than instructions and the hex codes
listed in the README for configuration.

A significant pain point in the `v0.1.0` → `v0.2.0` palette update is how long it
took to go through every single port and update the hex codes. Of course, the
jump from one flavour to four flavours is a significant change but the staff and
core team realised that this process would need to be repeated every time a
palette update was considered.

From that realisation, we started to push towards new ports being created with
Catppuccin [language
libraries](https://github.com/catppuccin/palette#available-formats). For
example, a number of our repositories use the
[catppuccin/palette](https://github.com/catppuccin/palette#node-package) NPM
library to generate the required configuration files. This has the benefit of
allowing us to update the libraries, push out a new release and, in theory,
ports can easily bring in this new release and use the new features
immediately.

The language libraries are an amazing step forward for Catppuccin as it allows
ports to be more consistent and easier to maintain. We would like to sincerely
thank again everyone who has created and contributed to these libraries. That
being said, we found that the language libraries are not suitable for every
generating every single port.

As aforementioned, language libraries are brilliant for ports that already
integrate with a build system / programming language, but we asked ourselves:

- **Do we really need or want an entire programming language + build script to
  generate some hex codes into a README?**

At this point, we realised that we needed to take a step back and brainstorm a
solution that would work for all ports, regardless of complexity. After numerous
discussions, we came to the conclusion that we needed a new tool that would
allow any user, regardless of whatever operating system and technical ability,
to easily create a Catppuccin port.

## Goals

- Improve the developer experience for creating, updating and maintaining
  Catppuccin ports.
- Make it easier to apply palette updates across the entire GitHub organisation.
- Give the developer (and users!) confidence that the colours conform to
  the Catppuccin palette.

## Non-Goals

- Replace the existing language libraries. This tool will be an addition to the
  toolbox of tools available to port creators.
- Create another barrier of entry for creating a simple Catppuccin port.

## Proposal

We would like to propose a new port creation tool called `whiskers` as the
**standard way to create and maintain Catppuccin ports**.

TODO

### Feature Set

TODO

### Distribution

TODO

### Encouraging Adoption

TODO

### Build System

TODO:

## Pros

TODO

## Cons

TODO

## Next Steps

TODO
