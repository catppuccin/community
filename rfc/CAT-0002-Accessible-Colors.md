# CAT-0000-Accessible-Colors.md

Date: **2023-04-01**

## Status

| Draft | In Review | Done |
| :---: | :-------: | :--: |
|  ☑️   | ☑️        |      |

## Proposed By

<table>
  <tr>
    <td align="center"><a href="https://github.com/Stonks3141"><img src="https://avatars.githubusercontent.com/u/82178396?v=4" width="100px;" alt=""/><br /><sub><b>Stonks3141</b></sub></a><br /></td>
  </tr>
</table>

## Introduction

The Catppuccin color scheme is vibrant and pastel-themed, and provides four flavours for users to choose from. Although the result is very attractive, it presents significant challenges for accessibility. For example, individuals with protanopia, a type of color blindness, may have trouble distinguishing the yellow and maroon colors. Additionally, the three dark flavours of the color scheme are very similar.

## Goals

- Improve accessibility for users with vision impairments such as color blindness
- Increase contrast for the color scheme
- Reduce ambiguity for users about which flavour to pick

## Non-Goals

- Get 2k upvotes on r/unixporn

## Proposal

This RFC proposes that Catppuccin adopt a new color scheme with a focus on contrast and accessibility. To reduce ambiguity, this RFC also proposes the unification of the frappe, macchiato, and mocha flavours into one flavour called "coffee". Since dark mode is at least 150% more poggers, based, and goated with the sauce ongod ongod frfrfr according to recent surveys, the light-mode version of the theme, latte, will be removed. We will increase the contrast between accent colours and reduce the number of base colours. Similar accent colours and colours that could be ambiguous to visually impaired users will also be removed.

The new coffee flavour is shown below.

<svg width="160" height="60">
  <rect x="0" y="0" width="40" height="60" fill="#000000" />
  <rect x="40" y="0" width="40" height="60" fill="#bbbbbb" />
  <rect x="80" y="0" width="40" height="60" fill="#ff00ff" />
  <rect x="80" y="0" width="40" height="60" fill="#ff00ff" />
  <rect x="120" y="0" width="40" height="60" fill="#ffff00" />
</svg>

### Pros

- Increases chances of adoption since users don't have to decide between flavours
- Improves user experience for visually impaired users
- Reduces effort required to create and maintain ports - 4x less variants

### Cons

None

## Decision Made
