# CAT-0002-REUSE.md

Date: **2023-03-28**

## Status

| Draft | In Review | Done |
| :---: | --------- | ---- |
|  ☑️   | ☑️        |      |

## Proposed By

<table>
  <tr>
    <td align="center"><a href="https://github.com/Stonks3141"><img src="https://avatars.githubusercontent.com/u/82178396?v=4" width="100px;" alt=""/><br /><sub><b>Stonks3141</b></sub></a><br /></td>
  </tr>
</table>

## Introduction

This RFC proposes that Catppuccin adopt the [REUSE](https://reuse.software) licensing standard for new ports and gradually migrate existing ones.

### Goals

- Set a consistent licensing policy for the organization
- Ensure that port users provide attribution by default
- Reduce ambiguity about how to comply with licensing requirements
- Make license and copyright information obvious and machine-readable

## Motivation

The Catppuccin project develops and maintains ports of the Catppuccin color scheme for various applications. Most people who use our ports do so by copying and pasting a configuration file from a Git repository or by enabling the Catppuccin theme in an application's settings. The former model, however, leads to a problem: the config file does not contain any licensing or copyright information, even though most open-source licenses require attribution. The obvious alternative would be reproducing the entire MIT license at the top of each file likely to be copied, which is both ugly and tedious.

## Proposal

This RFC proposes that Catppuccin adopt the [REUSE](https://reuse.software) licensing standard for new ports and gradually migrate existing ones. REUSE aims to make licensing and attribution easier for contributors and users of free software, and has already been adopted by many projects, including the KDE community and the majority of the Linux kernel. To comply with the REUSE standard, projects must add the text of all licenses used to a `LICENSES/` directory and add a brief header containing information about licensing and copyright holders to every file in the project.

Since Github only looks at the top-level LICENSE file when displaying repository metadata, we will keep that file but add the `LICENSES/` directory. Every file, even trivial ones, must have the following header:

```
# SPDX-FileCopyrightText: [year of file creation] Catppuccin Contributors <https://catppuccin.com>
# SPDX-License-Identifier: [identifier]
```

Files that don't support comments, such as JSON files and images, will omit the header. REUSE specifies that such files should place license information in an adjacent `.license` file, but after some discussion this is considered too tedious to be worthwhile.

These changes will be required for new ports and gradually applied to existing ones. To facilitate adoption, the template repository will be REUSEified and the contributing guidelines will be updated with instructions for implementing REUSE.

#### Example of a (mostly) REUSE-compliant port

```
.
├── README.md
│    │ <!--
│    │ SPDX-FileCopyrightText: 2023 Catppuccin Contributors <https://catppuccin.com>
│    │ SPDX-License-Identifier: MIT
│    │ -->
│    │ ...
├── LICENSE
├── LICENSES
│  └── MIT.txt
└── assets
   ├── preview.webp
   └── latte.webp
...
```

## Challenges

- Requires a significant amount of work across the organization

## Other information

- https://reuse.software/faq
- https://matija.suklje.name/how-and-why-to-properly-write-copyright-statements-in-your-code
