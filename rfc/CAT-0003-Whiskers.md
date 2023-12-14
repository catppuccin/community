# CAT-0003-Whiskers.md

Date: **2023-12-14**

## Status

| Draft | In Review | Done |
|:-----:|-----------|------|
|   ☑️   |     ☑️     |  ☑️   |

## Proposed By

<table>
<tr>
    <td align="center"><a href="https://github.com/sgoudham"><img src="https://avatars.githubusercontent.com/u/58985301?v=4" width="100px;" alt=""/><br /><sub><b>Hamothy</b></sub></a><br /></td>
    <td align="center"><a href="https://winston.sh/"><img src="https://avatars.githubusercontent.com/u/79978224?v=4?s=100" width="100px;" alt=""/><br /><sub><b>winston</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/backwardspy"><img src="https://avatars.githubusercontent.com/u/289746" width="100px;" alt=""/><br /><sub><b>backwardspy</b></sub></a><br /></td>
</tr>
</table>

## Table of Contents

- [Introduction](#introduction)
- [Goals](#goals)
- [Non-Goals](#non-goals)
- [Proposal](#proposal)
  - [Feature Set](#feature-set)
    - [Context Variables](#context-variables)
    - [Frontmatter](#frontmatter)
      - [Versioning](#versioning)
      - [Variables](#variables)
      - [Overrides](#overrides)
      - [Matrix](#matrix)
  - [Examples](#examples)
- [Pros](#pros)
- [Cons](#cons)
- [Next Steps](#next-steps)

## Introduction

Catppuccin currently boasts over 250 ports in its real estate, ranging from full
monorepos with complex build systems and CI/CD workflows; simple 10 line
configuration files that need to copy/pasted into the user's home directory; and
"README repositories" that are nothing more than instructions and the hex codes
listed in the README for configuration.

A significant pain point in the `v0.1.0` → `v0.2.0` palette update was how long
it took to go through every single port and update the hex codes. Of course, the
jump from one flavour to four flavours is a significant change but the
leadership team realised that this process would need to be repeated every time
a palette update was considered.

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

"**Do we really need or want an entire programming language + build script to
generate some hex codes into a few files or README?**"

At this point, we realised that we needed to take a step back and brainstorm a
solution that would work for all ports, regardless of complexity. After numerous
discussions, we came to the conclusion that we needed a new tool that would
allow any user, regardless of whatever operating system and technical ability,
to easily create a Catppuccin port.

## Goals

- Improve the developer experience for creating, updating and maintaining
  Catppuccin ports.
- Make it easier to apply palette updates across the entire GitHub organisation.
- Give the maintainers (and users!) confidence that the colours conform to
  the Catppuccin palette.

## Non-Goals

- Replace the existing language libraries. This tool will be an addition to the
  toolbox of tools available to port creators.
- Create another barrier of entry for creating a simple Catppuccin port.

## Proposal

We would like to propose a new port creation tool named `whiskers` to **help
create and maintain Catppuccin ports**.

Fundamentally, it is a CLI tool that expects template files, which the
Catppuccin palette is then injected into. We explored the use of
[handlebars](https://handlebarsjs.com/) for the underlying templating engine,
but ultimately found it to be too limiting for the different use cases across
the organisation. Eventually, we settled on
[tera](https://keats.github.io/tera/docs/#templates) as it allows us to be more
flexible.

### Feature Set

Whiskers can be invoked in two modes:

1. **Single-Flavour Mode**: Inject `latte`, `frappe`, `macchiato` or `mocha`
   into a template file.
1. **Multi-Flavour Mode**: Inject all 4 flavours into a template file.

#### Context Variables

In both of the modes mentioned above, you will have access to a plethora of
context variables, driven by our
[palette.json](https://github.com/catppuccin/palette/blob/main/palette.json).
They can be viewed in the [official documentation](https://github.com/catppuccin/toolbox/blob/main/whiskers/README.md#template).

#### Frontmatter

Whiskers templates may include a frontmatter section at the top of the file.

This is a YAML block that contains metadata about the template. If present, the
frontmatter section must be the first thing in the file and must take the form
of valid YAML set between triple-dashed lines.

##### Versioning

The most important frontmatter key is the **version**, which allows whiskers to
ensure that it can render a template it can understand.

E.g. `example.yml`

```yaml
---
whiskers:
  version: "2.0.0"
---
... standard template content goes here ...
```

##### Variables

Additional context variables can be added into the Frontmatter. A common usecase
of this feature is setting the accent colour:

```yaml
---
accent: "mauve"
---
border = "#{{flavor.colors[accent].hex}}"
diffAddFg = "#{{green.hex}}"
diffAddBg = "#{{darkGreen.hex}}"
```

Rendering the above template produces the following output:

```md
border = "#cba6f7"
diffaddfg = "#a6e3a1"
diffaddbg = "#40b436"
```

##### Overrides

Overrides can be specified via the command line through the `--overrides` flag,
taking in a JSON string resembling the frontmatter.

E.g. `example.yml`

```yaml
---
accent: "mauve"
---
theme:
  accent: "{{flavor.colors[accent].hex}}"
```

When running `whiskers example.yml -f latte --overrides '{"accent": "pink"}'`,
the accent will be overridden to pink.

##### Matrix

Whiskers can render multiple outputs from a single template using a matrix set
in the frontmatter. This can be useful for generating one output per flavor per
accent color.

E.g. `example.yml`

```yaml
---
whiskers:
  version: 2.0.0
  matrix:
    - variant: ["normal", "no-italics"]
    - flavor
    - accent
  filename: "catppuccin-{{flavor.identifier}}-{{accent}}-{{variant}}.ini"
---
# Catppuccin {{flavor.name}}{% if variant == "no-italics" %} (no italics){% endif %}
[theme]
{{accent}}: #{{flavor.colors[accent].hex}}
```

Running `whiskers template.ini` will generate the following files:

```text
catppuccin-latte-rosewater-normal.ini
catppuccin-latte-rosewater-no-italics.ini
catppuccin-latte-flamingo-normal.ini
catppuccin-latte-flamingo-no-italics.ini
...
catppuccin-frappe-rosewater-normal.ini
catppuccin-frappe-rosewater-no-italics.ini
```

For further information on how the matrix works, see the [official
documentation](https://github.com/catppuccin/toolbox/tree/main/whiskers#template-matrix).

### Examples

We have created sample programs to act as reference implementations, which can
be found in the
[`examples/`](https://github.com/catppuccin/toolbox/tree/main/whiskers/examples)
directory in the [official
documentation](https://github.com/catppuccin/toolbox/blob/main/whiskers/README.md).

If you would like to see **real-life** use cases of the features discussed
above, please see:

- [catppuccin/lazygit](https://github.com/catppuccin/lazygit/blob/main/lazygit.tera)
- [catppuccin/i3](https://github.com/catppuccin/i3/blob/main/i3.tera)
- [catppuccin/waybar](https://github.com/catppuccin/waybar/blob/main/waybar.tera)
- [catppuccin/hyprland](https://github.com/catppuccin/hyprland/blob/main/hyprland.tera)

## Pros

- Greatly improved developer experience, ensuring that maintainers can easily
  create and update files in relation to Catppuccin's palette.
- It is _extremely_ trivial to generate ports that simply require hex codes (or
  other formats) to exist in a file directory.
- No complex build scripts or programming languages are brought into the
  equation for simple Catppuccin ports.
- Organisation-wide palette updates can be easily applied, with updates to
  language libraries and whiskers.

## Cons

- Extra CLI tool that maintainers have to install locally.
- Slight learning curve of getting familiar with
  [tera](https://keats.github.io/tera/docs/#templates) syntax.

## Next Steps

- Update documentation in
  [catppuccin/catppuccin](https://github.com/catppuccin/catppuccin) to recommend
  whiskers for new ports.
- Continue to roll out whiskers across the organisation, adding new features for
  worthwhile usecases and fixing bugs where they arise.
- Track the adoption of whiskers in our organisation -
[arewewhiskersyet.com](https://arewewhiskersyet.com)
