#!/usr/bin/env bash
# Runs after each Claude response — commits and pushes any changes.

set -euo pipefail

cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0

# Nothing to do if working tree is clean
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  exit 0
fi

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

git add -A
git commit -m "initial commit" --no-verify 2>/dev/null || true
git push origin HEAD 2>/dev/null || echo "[auto-push] push failed — check network or credentials"
