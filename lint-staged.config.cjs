module.exports = {
    "*.{ts,tsx}": [
        () => "tsc --noEmit --project ./tsconfig.app.json",
        "prettier --write",
        "eslint . --report-unused-disable-directives",
    ]
}
