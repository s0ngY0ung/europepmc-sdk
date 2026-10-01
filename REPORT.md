# First mini task: Europe PMC SDK

I used the Voxgig generator to build a TypeScript SDK for a focused, read-only subset of the Europe PMC literature API: publication search and article lookup. I checked the Voxgig SDK organisation's repository list on 1 October 2026 and found no Europe PMC SDK. This public API let me test real requests without registering for a trial or supplying credentials.

## What I delivered

- A community-authored OpenAPI 3.0.3 description in `.sdk/def/openapi.yaml`, based on the [Europe PMC documentation](https://europepmc.org/RestfulWebService). It is a focused subset, not an official or complete specification.
- Generated TypeScript SDK source, a retained model and toolchain, and an executable live example.
- A guide configuration separating `Search` and `Article`, with project metadata pointing to my repository.
- MIT-licensed work. The generated code retains its Voxgig notices; my authored contributions are identified in `COPYRIGHT.md`.

## Verification

I used Node 24.14.0 with `@voxgig/create-sdkgen` 0.30.5, `@voxgig/sdkgen` 4.33.0, `@voxgig/apidef` 8.22.1 and `@voxgig/model` 12.0.0. The committed lockfile records the exact installed dependencies.

The final generated suite reported 205 passed, zero failed and one skipped test. `voxgig-sdkgen doctor` reported that the scaffold matched. The live example used the generated entity methods, searched for `EXT_ID:28818901 AND SRC:MED`, checked the single returned publication, and retrieved the same identifier through `Article().load()`. These are live API checks, separate from the mocked generated suite. The example passes `format: 'json'` explicitly.

## Observations and recommendations

1. On Windows, automatic dependency installation failed with `Failed to start npm: spawn npm ENOENT`. Manual installation worked, but generation subsequently failed to resolve `api/api-info.aontu`; the diagnostics included a search path without the Windows drive prefix. I completed generation and testing in WSL with Node 24. I would recommend an automated native Windows scaffold-to-test check and a documented Windows workaround. I did not investigate the path-resolution root cause fully.
2. The website agent runbook still names `.aon` files, whereas the current repository guide and package use `.aontu`. Keeping the website example aligned with the released package would make the initial route clearer.
3. My first specification incorrectly gave article lookup the same response wrapper as search. The generator grouped both operations together, and mocked tests passed. Live testing exposed my specification error; I corrected the wrapper and regenerated. This was my input error, not a generator defect. A short example for checking real response shapes and explaining guide-based entity separation would help new users.
4. Generated query match names use `page_size` and `cursor_mark`, while the API uses `pageSize` and `cursorMark`. The mapping works in the live check. Showing both names together in the generated reference would make this easier to discover.

The model/guide approach let me make changes without hand-editing generated SDK source. The main opportunity I found was improving the first-run path and diagnostics on Windows.

## AI use and scope

I used Codex to inspect the documentation, draft the focused specification, operate the Voxgig toolchain, run checks and prepare this report. SDK runtime code came from the Voxgig generator. Assertions against real responses checked the result, rather than relying on generated tests alone. This report describes the AI-assisted session; it does not claim a separate manual review by me. Work stayed within the 30-minute session limit. I did not attempt full API coverage, npm publication, or a toolchain bug fix.
