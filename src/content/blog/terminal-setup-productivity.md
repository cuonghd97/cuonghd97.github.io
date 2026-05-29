---
title: "My Terminal Setup: From Vanilla Bash to a Productive Dev Environment"
description: "How I configured my terminal with Zsh, Starship prompt, tmux, and a curated set of CLI tools for maximum developer productivity."
pubDate: 2026-05-01
tags: ["devops", "setup", "productivity"]
draft: false
---

## Philosophy

A good terminal setup should be:
- **Fast** — No noticeable startup lag
- **Informative** — Show relevant context without clutter
- **Portable** — Work across macOS and Linux

## The Core Stack

### Zsh + Starship Prompt

I switched from Oh My Zsh to a minimal Zsh config with Starship. The result? **Sub-100ms** shell startup time.

```bash
# Install Starship
curl -sS https://starship.rs/install.sh | sh

# Add to ~/.zshrc
eval "$(starship init zsh)"
```

My `starship.toml` focuses on showing just what I need:

```toml
[character]
success_symbol = "[➜](bold green)"
error_symbol = "[✗](bold red)"

[directory]
truncation_length = 3
truncate_to_repo = true

[git_branch]
symbol = " "
format = "[$symbol$branch]($style) "

[python]
symbol = " "
format = "[$symbol$pyenv_prefix($version)]($style) "

[java]
symbol = " "
format = "[$symbol($version)]($style) "
```

### tmux Configuration

tmux is essential for managing multiple sessions. My key bindings:

```bash
# Prefix key: Ctrl+a (easier than Ctrl+b)
set -g prefix C-a
unbind C-b

# Split panes with | and -
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# Navigate panes with vim keys
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

## Essential CLI Tools

| Tool | Purpose | Replaces |
|------|---------|----------|
| `eza` | File listing | `ls` |
| `bat` | File viewing | `cat` |
| `ripgrep` | Text search | `grep` |
| `fd` | File finding | `find` |
| `fzf` | Fuzzy finder | — |
| `lazygit` | Git TUI | `git` commands |

## Final Thoughts

Invest time in your terminal setup. It pays dividends every single day. Start with one tool, get comfortable, then add another.
