module.exports = {
  extends: [
    './node_modules/cz-conventional-changelog',
  ],
  rules: {
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'chore', 'test', 'revert', 'docs']],
  },
};
