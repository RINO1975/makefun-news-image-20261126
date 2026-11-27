# World News — Thursday 26 November 2026

An original newspaper front page in one 1024 × 1024 PNG: a prominent Thursday date, a seven-event UTC timeline, six numbers, three illustrated leads, ten illustrated dispatches, a hand-drawn world map, 22 short briefs, a date-check box, and attributed sources. The warm paper, dark ink, muted blue and red accent form a single editorial composition. Every illustration is an original inline SVG drawn for this entry.

[![make.fun](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/RINO1975/makefun-news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/RINO1975/makefun-news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

## Run

Use Node.js 22.18 or newer, with no package installation:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

With no override, the output is `/output/entry.png`. The program validates the PNG signature, byte limit, IHDR dimensions, every chunk checksum, the complete IEND marker and hardcoded SHA-256 before copying the image. It then reads the output back and compares all bytes. It uses only Node's standard library. The image is shipped in the repository; rendering tools are not needed at runtime.

## Story list

`stories.md` preserves the supplied verified list. The image uses short, attributed headlines from all 35 numbered stories, including the Brussels summit impasse, overnight Ukraine exchanges and Gaza strikes. Counts follow the supplied classification: Europe 9; Asia 11; Middle East 4; North America 5; Africa 2; Oceania 2; South America 2. The header records 12 fields. Its date check separates Thursday's reporting from earlier announcements and later events, and the final-sweep footer gives 01:30 UTC on Friday 27 November as the coverage boundary.

Trust labels follow the supplied list: CONFIRMED means two or more outlets, OFFICIAL means on the record, and REPORTED means one outlet. Story 12 is REPORTED (FT via Reuters). Earlier announcements are not counted as new Thursday events.

## Verification

The final image is 298,408 bytes and exactly 1024 × 1024 pixels. Its SHA-256 is:

```text
1edbe0fd62c2d7d7d00e82c6c1ceebb02e1ff28665b4402d1697c1c5e6c29a59
```

Two runs, using `MAKEFUN_OUTPUT_DIR=out` and `MAKEFUN_OUTPUT_DIR=out2`, produced bytes identical to `entry.png` and to each other. Negative checks rejected a bad signature, wrong dimensions, an oversized file, a truncated chunk, a bad CRC and a changed image with valid chunk checksums. A static audit of `main.ts` found no network, clock, randomness, subprocess execution or dynamic code.

The page's geometry audit finds 35 numbered stories and no measured text overflow. Each number-label box ends 5 px above the top of the strip divider. Full-size and 300 × 300 previews were visually inspected: the masthead, date and lead headlines read at 300 px; small supporting text needs the full-resolution image. The supplied full story list, trust definitions and detailed date exclusions remain available in `stories.md`.

Brief-source abbreviations: Rtr = Reuters; JT = Japan Times; SH = sudanhorizon; BBG = Bloomberg; AJ = Al Jazeera; PBP = Palm Beach Post; USA = USA Today. Short headlines preserve the supplied claims and attribution. Map pins 1–13 refer to the illustrated story numbers; regional totals cover all 35 stories.

## Build sources

- `frontpage.html`: self-contained page and original inline SVG illustrations.
- `render.mjs`: local headless Chromium renderer and geometry audit.
- `entry.png`: the finished competition image.
- `preview-300.png`: a 300-pixel-wide visual QA preview.
- `main.ts`: deterministic validated copy program.
- `stories.md`: the supplied complete news list.
- `LICENSE`: the kit starter's byte-exact MIT license.
- `.makefun/owner.json`: competition ownership claim.

To reproduce the artwork on a machine with Chromium at `/usr/bin/chromium` and DejaVu fonts, run `node render.mjs`. The renderer blocks HTTP and HTTPS requests and loads its page from disk. The contest runtime only executes `main.ts`.

This repository was built and checked locally. It has not been submitted or pushed to a hosting service.
