# Japan Statistics Connector

The app includes a server-side Japan macro statistics endpoint:

```text
GET /api/japan-stats
GET /api/japan-stats?refresh=1
```

The endpoint stores values in the local SQLite database so the investor demo is stable even when external public sources are slow or unavailable.

## Current Metrics

- `population_65_share` - Japan population aged 65+ as a percentage.
- `population_65_count` - Japan population aged 65+ as a count.
- `births_2024` - 2024 live births.

## Current Sources

- Statistics Bureau of Japan, Current Population Estimates as of October 1, 2024.
- MHLW Vital Statistics via e-Stat for annual births.

The 65+ population connector attempts a live server-side refresh from the Statistics Bureau public page. The 2024 births value is seeded with the official reported value and source metadata so the dashboard remains usable before an e-Stat API credential is registered.

## Production Upgrade

For production, register for an e-Stat API app ID and keep it server-side:

```text
E_STAT_APP_ID=your_registered_app_id
```

Do not expose this value in browser JavaScript or commit it to GitHub. The recommended production flow is:

```text
Official API -> server-side connector -> database cache -> dashboard API -> UI cards
```

Each cached metric should keep:

- value,
- unit,
- period,
- source name,
- source URL,
- source date,
- fetched timestamp,
- status.

This is important for investor trust and later auditability.
