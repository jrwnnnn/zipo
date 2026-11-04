# Contributing

First off, thanks for taking the time to contribute! These are the guidelines for contributing to this project.

## Code of Conduct

All contributors are expected to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Before Writing Code

For new features or significant changes, [open an issue](../../issues) or comment on an existing one first. This ensures we do not have multiple people working on the same feature and allows us to discuss the approach before you invest time in building it. For existing bugs, you can jump straight to a PR.

## Development Setup

### Prerequisites

Make sure you have the following:

- LTS version of [Node.js](https://nodejs.org/en/download)
- JDK [17](https://adoptium.net/temurin/releases/?version=17) or [21](https://adoptium.net/temurin/releases/?version=21)
- [Android SDK (API 36)](https://developer.android.com/tools/sdkmanager) with `ANDROID_HOME` configured
- [Git](https://git-scm.com/)

### Getting Started

1. [Fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo) the repository and [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it locally.

   ```bash
   git clone https://github.com/<your-username>/zipo.git
   cd zipo
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Run the app in development mode. `android:dev` needs a phone connected by USB with [USB debugging](https://developer.android.com/studio/debug/dev-options) on, and on the same Wi-Fi as your computer:

   ```bash
   npm run dev             # browser preview for UI work only
   npm run android:dev     # run on your phone (recommended)
   ```

To generate a standalone debug APK:

```bash
npm run build
npm run sync
cd android
./gradlew assembleDebug      # Windows: .\gradlew assembleDebug
```

The compiled APK will be at `android/app/build/outputs/apk/debug/app-debug.apk`.

## Development Guidelines

### Branching Strategy

- `main` contains the latest development code.
- Create a dedicated branch for each feature or bug fix using clear prefixes like `feat/new-feature-name` or `fix/issue-description`.

### Testing

Zipo uses [Vitest](https://vitest.dev/) for unit tests and [Playwright](https://playwright.dev/) for e2e tests.

```bash
npx playwright install      # install browsers for e2e tests, run this only once
npm run test                # run all tests
npm run test:unit           # run unit tests only
npm run test:e2e            # run e2e tests only
```

### Code Style

This project enforces a consistent code style using [Prettier](https://prettier.io/). A [Husky](https://typicode.github.io/husky/) pre-commit hook formats your staged files automatically when you commit. CI fails if any file isn't formatted correctly.

```bash
npm run format          # format all files
npm run format:check    # check formatting of all files
```

### Commit Messages

Follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification. Read the guide through if you aren't familiar with it already.

### Pull Request Guidelines

If you're new to pull requests, GitHub's [guide to creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) walks through it.

- Avoid including multiple unrelated features or fixes in a single PR. If unrelated changes can be separated, open separate PRs so they can be reviewed and merged independently.

- If your PR fixes or resolves existing issues, make sure you mention them with a closing keyword, such as `Closes #123`.

- Make sure your PR title follows the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

- It's ok to have multiple commits in a single PR. You don't have to rebase or force push for your changes as we will squash the commits into one commit when merging.
