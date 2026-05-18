# mirrors-dts-linter

A [pre-commit](https://pre-commit.com) hook for [dts-linter](https://github.com/kylebonnici/dts-linter).

## Using dts-linter with pre-commit

Add the following to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/urob/mirrors-dts-linter
    rev: v0.5.0        # Use the sha/tag you want to point at.
    hooks:
      - id: dts-lint   # Run the linter.
      - id: dts-format # Run the formatter.
```

To configure the linter or formatter, pass the relevant dts-linter arguments through `args`. For example, to use two spaces for indenting, use:

```yaml
repos:
  - repo: https://github.com/urob/mirrors-dts-linter
    rev: v0.5.0        # Use the sha/tag you want to point at.
    hooks:
      - id: dts-lint   # Run the linter.
      - id: dts-format # Run the formatter.
        args: [ --insertSpaces, --tabSize=2 ]
```

