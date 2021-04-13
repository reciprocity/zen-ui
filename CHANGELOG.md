## [3.3.8](https://github.com/reciprocity/zen-ui/compare/3.3.7...3.3.8) (2021-04-13)


### Bug Fixes

* **react:** cat .npmrc ([f3dc9e4](https://github.com/reciprocity/zen-ui/commit/f3dc9e44e107dfd951fc8feb03fb0d5f587deded))

## [3.3.7](https://github.com/reciprocity/zen-ui/compare/3.3.6...3.3.7) (2021-04-13)


### Bug Fixes

* **react:** avoid trying to stringify a nullable value ([5a555ff](https://github.com/reciprocity/zen-ui/commit/5a555ff571d731637be5fc809e9e21293ef829b5))

## [3.3.6](https://github.com/reciprocity/zen-ui/compare/3.3.5...3.3.6) (2021-04-13)


### Bug Fixes

* **react:** use pipe instead of ignore for execSync ([98da1cb](https://github.com/reciprocity/zen-ui/commit/98da1cbc6052988fe78737ae111aa93483f2bd95))

## [3.3.5](https://github.com/reciprocity/zen-ui/compare/3.3.4...3.3.5) (2021-04-13)


### Bug Fixes

* **react:** inherit stdio for the git log ([b5f8743](https://github.com/reciprocity/zen-ui/commit/b5f8743882cf1916a19ec39b87d39c88f2236aca))

## [3.3.4](https://github.com/reciprocity/zen-ui/compare/3.3.3...3.3.4) (2021-04-13)


### Bug Fixes

* **react:** load the env vars on the publis script ([fab2fa3](https://github.com/reciprocity/zen-ui/commit/fab2fa3f4763da7b14cb284ece62a27a72435c4b))

## [3.3.3](https://github.com/reciprocity/zen-ui/compare/3.3.2...3.3.3) (2021-04-13)


### Bug Fixes

* export necessary types ([b2eb96f](https://github.com/reciprocity/zen-ui/commit/b2eb96fbc704b6e4059944f18766e40c681e8456))

## [3.3.2](https://github.com/reciprocity/zen-ui/compare/3.3.1...3.3.2) (2021-04-13)


### Bug Fixes

* **zen-avatar:** fix avatar image not displayed ([7352e74](https://github.com/reciprocity/zen-ui/commit/7352e74eaf938e0c558830ba50c99ecd1383c5b8))

## [3.3.1](https://github.com/reciprocity/zen-ui/compare/3.3.0...3.3.1) (2021-04-13)


### Bug Fixes

* first row should have top blue border when selected ([a250dfc](https://github.com/reciprocity/zen-ui/commit/a250dfc12d31d090db45f4968294e7dd7add55da))

# [3.3.0](https://github.com/reciprocity/zen-ui/compare/3.2.5...3.3.0) (2021-04-13)


### Features

* **zen-card:** add additional shadow variant ([2102c61](https://github.com/reciprocity/zen-ui/commit/2102c6140513dcbadb2de10e7774aafe39543198))

## [3.2.5](https://github.com/reciprocity/zen-ui/compare/3.2.4...3.2.5) (2021-04-12)


### Bug Fixes

* **zen-progress-tracker:** labels now have white-space nowrap style ([8fe737c](https://github.com/reciprocity/zen-ui/commit/8fe737c84ce252e4c0c61553be1650133f65e5c0))

## [3.2.4](https://github.com/reciprocity/zen-ui/compare/3.2.3...3.2.4) (2021-04-12)


### Bug Fixes

* **zen-tabs:** fix that tabs stretch full width ([995f32e](https://github.com/reciprocity/zen-ui/commit/995f32e99506808f5eb004aabcd9291ce201ab78))

## [3.2.3](https://github.com/reciprocity/zen-ui/compare/3.2.2...3.2.3) (2021-04-12)


### Bug Fixes

* non-selectable and non-expandable child row should still have left padding ([898120d](https://github.com/reciprocity/zen-ui/commit/898120d353c80fb589833c8b7d3097d56390159e))
* **zen-table:** expandable and visible props are always correctly calculated ([6a7706a](https://github.com/reciprocity/zen-ui/commit/6a7706a8242afbfe24779c88a3928ef4458ceb1e))
* **zen-table:** selected and indeterminate props are always correctly calculated ([feb73b9](https://github.com/reciprocity/zen-ui/commit/feb73b915f1e3980be20b919ded4974826c8cb52))

## [3.2.2](https://github.com/reciprocity/zen-ui/compare/3.2.1...3.2.2) (2021-04-12)


### Bug Fixes

* **zen-space:** vertically distributed items should not have right margin ([db94404](https://github.com/reciprocity/zen-ui/commit/db94404714d890dc3679a8085333eb1ed9a4ee53))

## [3.2.1](https://github.com/reciprocity/zen-ui/compare/3.2.0...3.2.1) (2021-04-09)


### Bug Fixes

* **zen-avatar-icon:** removed lg size ([6d6c9d5](https://github.com/reciprocity/zen-ui/commit/6d6c9d5350a726c31eec6f3caa8f4530e103766a))
* **zen-button:** change variant names ([6d7afb3](https://github.com/reciprocity/zen-ui/commit/6d7afb318e8f9caa1f9e7171f6eb632938fc0046))

### BREAKING CHANGES

> There was an error with the commit message, this was supposed to be v4.0.0

* **zen-avatar-icon:** The `lg` size variant was removed.
* **zen-button**: The following button variants have been renamed: `primary` to `blue-filled`, `secondary` to `blue-ghost`, `tertiary` to `grey-ghost`, `destructive` to `red-filled` and `positive` to `green-ghost`; and the default `variant`, being that is was `primary`, was changed to `blue-filled`.

# [3.2.0](https://github.com/reciprocity/zen-ui/compare/3.1.0...3.2.0) (2021-04-09)


### Bug Fixes

* **zen-tab:** add default font size and styling ([f7e91de](https://github.com/reciprocity/zen-ui/commit/f7e91def58852f564c1a5629f9b9e88e2630c879))
* **zen-tab:** promote selected to property ([6112352](https://github.com/reciprocity/zen-ui/commit/6112352162c0ccacb37e23c323aa7dad9f405340))
* **zen-tabs:** fix that event is logged in the console ([9c28377](https://github.com/reciprocity/zen-ui/commit/9c28377b70cef47191615892b734bb61610138f6))


### Features

* **zen-tab:** add zen-tab fragment ([d4efdd9](https://github.com/reciprocity/zen-ui/commit/d4efdd9df9082587cb28bddd9a465f022921a967))
* **zen-tabs:** convert story to mdx ([01f5223](https://github.com/reciprocity/zen-ui/commit/01f5223e0bea9eec9b14d74be3b41ab6f38b65ae))
* **zen-tabs:** move tabs to story navigation folder ([bb512c5](https://github.com/reciprocity/zen-ui/commit/bb512c5b9ee71cfede7598dbc6368e2cd4101b26))
* **zen-tabs:** update zen tab implementation ([50cc6ff](https://github.com/reciprocity/zen-ui/commit/50cc6ffd6ebd3f66bc338181eab86a3c1574481d))

# [3.1.0](https://github.com/reciprocity/zen-ui/compare/3.0.0...3.1.0) (2021-04-09)


### Features

* **zen-avatar:** add override for initials ([a0149d7](https://github.com/reciprocity/zen-ui/commit/a0149d75d6c65176fe86d45a66c744e67cf1af69))

# [3.0.0](https://github.com/reciprocity/zen-ui/compare/2.3.1...3.0.0) (2021-04-09)


### Features

* remove zen-table-header and zen-table-header-cell ([862cd35](https://github.com/reciprocity/zen-ui/commit/862cd35e13d6423e3704e95b7b5d1f8464ac50fc))


### BREAKING CHANGES

* zen-table-header and zen-table-header-cell is removed.
It is substituted by zen-row and new prop `header`

## [2.3.1](https://github.com/reciprocity/zen-ui/compare/2.3.0...2.3.1) (2021-04-07)


### Bug Fixes

* **zen-drawer:** when component is not opened on first load display is set to none ([b1f47e9](https://github.com/reciprocity/zen-ui/commit/b1f47e958f55114cc25a644580bdaa69d6a46efe))

# [2.3.0](https://github.com/reciprocity/zen-ui/compare/2.2.4...2.3.0) (2021-04-07)


### Bug Fixes

* **zen-tooltip:** update story styles to equal the wireframes ([d18a434](https://github.com/reciprocity/zen-ui/commit/d18a4342184d2030ff07a396f61207d7fa681808))


### Features

* **zen-tooltip:** add max width prop ([b752097](https://github.com/reciprocity/zen-ui/commit/b75209748e239c80a077d8a84c8ce52d0a8fce63))

## [2.2.4](https://github.com/reciprocity/zen-ui/compare/2.2.3...2.2.4) (2021-04-07)


### Bug Fixes

* **zen-dropdown:** change to apply max-height instead of height ([7eca163](https://github.com/reciprocity/zen-ui/commit/7eca16349eb3cac535ebf9eedab8415432ac7382))
* **zen-dropdown:** fix menu height not being applied ([f76d795](https://github.com/reciprocity/zen-ui/commit/f76d7953400f11b3cc2a001fa8ad2254cd393cd8))

## [2.2.3](https://github.com/reciprocity/zen-ui/compare/2.2.2...2.2.3) (2021-04-06)


### Bug Fixes

* **zen-drawer:** completely hides drawer on close ([4a3aac6](https://github.com/reciprocity/zen-ui/commit/4a3aac657005c2a91170bba76643e70919786380))

## [2.2.2](https://github.com/reciprocity/zen-ui/compare/2.2.1...2.2.2) (2021-04-05)


### Bug Fixes

* **zen-avatar-details:** add no wrap style ([c9da999](https://github.com/reciprocity/zen-ui/commit/c9da99947522f6c4de915e614c26c33a4a84b676))
* **zen-avatar-group:** changes on data in storybook were not reflected ([3f911da](https://github.com/reciprocity/zen-ui/commit/3f911dade5a07a432bf8f806c17eede67ebfa0d0))

## [2.2.1](https://github.com/reciprocity/zen-ui/compare/2.2.0...2.2.1) (2021-04-05)


### Bug Fixes

* replace em units with rem ([5caf82d](https://github.com/reciprocity/zen-ui/commit/5caf82d0c580aca276d84abf2402822aca7ead76))

# [2.2.0](https://github.com/reciprocity/zen-ui/compare/2.1.1...2.2.0) (2021-04-05)


### Features

* added focusInput method to zen-textarea ([e0133b8](https://github.com/reciprocity/zen-ui/commit/e0133b8499cc0e9c9d49f9bac9b07065adcbe61e))

## [2.1.1](https://github.com/reciprocity/zen-ui/compare/2.1.0...2.1.1) (2021-04-02)


### Bug Fixes

* **zen-table header:** fix sticky param set ([3b12f99](https://github.com/reciprocity/zen-ui/commit/3b12f9920c466e6bd0ae3f147056ba1ba683cc25))

# [2.1.0](https://github.com/reciprocity/zen-ui/compare/2.0.0...2.1.0) (2021-04-02)


### Features

* **zen-button:** add size prop ([5379605](https://github.com/reciprocity/zen-ui/commit/5379605df2fea8c48dac688ff4b9572ef3733250))
* **zen-button:** add styles for sizes ([eb05787](https://github.com/reciprocity/zen-ui/commit/eb05787ac45b85b060a567d1fe889790d5adb845))

# [2.0.0](https://github.com/reciprocity/zen-ui/compare/1.1.1...2.0.0) (2021-04-01)


### Bug Fixes

* fix firefox h3 overlapping dropdown ([66d08e6](https://github.com/reciprocity/zen-ui/commit/66d08e66c702cb33d88b6d918c168dfc1ea4caa3))
* fix popover width ([3fad543](https://github.com/reciprocity/zen-ui/commit/3fad543e1c9199eac2568da56df9233fff4edd8e))
* **zen-dropdown:** define field height instead of padding ([c743ce5](https://github.com/reciprocity/zen-ui/commit/c743ce56b6c93f5e3df617679ebfab8877993cc4))
* **zen-dropdown:** truncate long text ([383f3e9](https://github.com/reciprocity/zen-ui/commit/383f3e9a482d2cf692c04b6b2a5b1868a583e6cb))
* **zen-input:** define host height instead of padding ([07939e1](https://github.com/reciprocity/zen-ui/commit/07939e10c72ad687ca19778938472f5639ff258d))
* **zen-option:** remove vert padding and control height with line-height ([f3eda2f](https://github.com/reciprocity/zen-ui/commit/f3eda2f3ee2aa9a1d811fa1bbe07e3b07d2e363f))
* **zen-option:** truncate long text ([aabfcf5](https://github.com/reciprocity/zen-ui/commit/aabfcf52209e4f8cba00f3a5afae859f00d75a01))
* unify input, dropdown, date-picker height to 2 rem ([1b0ea14](https://github.com/reciprocity/zen-ui/commit/1b0ea1433f34b51abbec38efa02b9ee6c98e352b))


### Features

* **zen-date-picker:** add prop `size` and sizes story ([7623d21](https://github.com/reciprocity/zen-ui/commit/7623d21fc34340ba1e95f3a05e9330fbb9fda224))
* **zen-dropdown:** add size prop ([fa9bc55](https://github.com/reciprocity/zen-ui/commit/fa9bc55c3c72f922628d46f4f4769389bb4c7179))
* **zen-input:** add prop `size` and styles ([6e6d65d](https://github.com/reciprocity/zen-ui/commit/6e6d65df9014c9f43b75592d249038962a119efe))
* **zen-option:** add size prop ([8ed071c](https://github.com/reciprocity/zen-ui/commit/8ed071cdb5e7121572e3c063cb818498479f4f73))


### BREAKING CHANGES

* Input, dropdown, date-picker default height is unified to 2 rem.

## [1.1.1](https://github.com/reciprocity/zen-ui/compare/1.1.0...1.1.1) (2021-04-01)


### Bug Fixes

* change table header expandable to be a attribute ([2786037](https://github.com/reciprocity/zen-ui/commit/278603707c31e678fbffd0b99abb2dcad660e962))
* make header selectable reflective and update styles ([081d7a5](https://github.com/reciprocity/zen-ui/commit/081d7a58721cd85ab31f00c474efae0875c80d7f))
* make tabel header cell sticky prop to be reflective ([2c7d372](https://github.com/reciprocity/zen-ui/commit/2c7d3722a3eeddb90fa6fc62e62ab0ecb2e5ac14))
* make table row params reflective and update styles ([6656153](https://github.com/reciprocity/zen-ui/commit/66561537f524a843cde3afa0db7cd1ea629eb3d3))

# [1.1.0](https://github.com/reciprocity/zen-ui/compare/1.0.1...1.1.0) (2021-04-01)


### Bug Fixes

* small fix for icon margin ([68e01ad](https://github.com/reciprocity/zen-ui/commit/68e01ad2f7603fc2612d4fe6f7a40df3f004178f))


### Features

* add tooltip title and hyperlink ([cedd87f](https://github.com/reciprocity/zen-ui/commit/cedd87f9e55a0cd30fcf1dd6e4771326f2e655d2))

## [1.0.1](https://github.com/reciprocity/zen-ui/compare/1.0.0...1.0.1) (2021-03-31)


### Bug Fixes

* enable NPM releases ([75e0490](https://github.com/reciprocity/zen-ui/commit/75e0490c71f88c2465ad9664b993cf4c0c5d5b14))

# [1.0.0](https://github.com/reciprocity/zen-ui/compare/0.1.7...1.0.0) (2021-03-31)


### Bug Fixes

* add and update vrt snapshots ([9844ea1](https://github.com/reciprocity/zen-ui/commit/9844ea1b3f2b8639061a90fee07464332863c1d7))
* add role button to cancel button ([a9da0c2](https://github.com/reciprocity/zen-ui/commit/a9da0c2d3c033ceed8ecb69bd3ed22f15f2079c6))
* added invalid style to correct field ([231ac37](https://github.com/reciprocity/zen-ui/commit/231ac371b4c60f208307804ae09fb59c6cfd48ee))
* avatar group sizes not beiing applied on avatar group ([e5f5e72](https://github.com/reciprocity/zen-ui/commit/e5f5e721f6d3ed5dea5b2088c2467d54b72f86c9))
* change avatar variant to be a class property ([0f8c06d](https://github.com/reciprocity/zen-ui/commit/0f8c06d79d1093397877139e46e0c2b69373b8cc))
* change variant name to dashed for consistency in code ([baf1080](https://github.com/reciprocity/zen-ui/commit/baf10807c2fca90fd38db180c62970230c830b27))
* changed implementation based on pr review suggestions ([6e172ec](https://github.com/reciprocity/zen-ui/commit/6e172ecf635cfdadc2875ea6eea4d0c81f72b84b))
* changed story title ([0dbef34](https://github.com/reciprocity/zen-ui/commit/0dbef34ae85a9478c378e94d1db4e0eded4af4cf))
* close button always align top ([7fd1238](https://github.com/reciprocity/zen-ui/commit/7fd123896a50a0f2329db6fd18a380d7b7974502))
* don't reflect paddings that are just forwarded ([88e1794](https://github.com/reciprocity/zen-ui/commit/88e1794a4fae5c243d1599f2986bd0c681adc0f1))
* fix flaky drawer visual test ([ea8db0f](https://github.com/reciprocity/zen-ui/commit/ea8db0f2575d8343969335d5bf019036f8d4c9fb))
* fix rebase conflicts issues with padding ([5ce0847](https://github.com/reciprocity/zen-ui/commit/5ce08477f40a42974d3d482402cf4bf22f451ee6))
* fixes the table header z index issue ([097f4ff](https://github.com/reciprocity/zen-ui/commit/097f4ff4ceb9b9bb8f49ae8b0fb62343ba565b7b))
* minimize padding css size print ([6247eb4](https://github.com/reciprocity/zen-ui/commit/6247eb42913289bfd5cb01a85371cf9f75d18f69))
* prevent mutating instance inside loop ([66c6294](https://github.com/reciprocity/zen-ui/commit/66c62946b7bfc187a987caa4e36c10d147f30908))
* rebase and fix merge conflicts ([63c41a7](https://github.com/reciprocity/zen-ui/commit/63c41a759c9154ff41ecb069264a4c778e065889))
* rebased and fixed merge conflicts ([8cedd71](https://github.com/reciprocity/zen-ui/commit/8cedd7141989afac30cb025ae51404196dba3f8d))
* remove documented lines for events and methods ([f788fc2](https://github.com/reciprocity/zen-ui/commit/f788fc2c3133bbaec0f487b78c895f004e7c5139))
* remove paddingless slots ([24c803f](https://github.com/reciprocity/zen-ui/commit/24c803f4147b7a1040fcae966a95584ff89b4a1b))
* removed indeterminate prop from row story and fixed header story ([0102231](https://github.com/reciprocity/zen-ui/commit/010223101a49c7589beab1f7b6e385f23c18d1da))
* rename basic type to basic and basic-lg ([0250c2d](https://github.com/reciprocity/zen-ui/commit/0250c2d6bc4751d1777b45cbdde86b35550c9a16))
* revert changelog ([4749adc](https://github.com/reciprocity/zen-ui/commit/4749adc3a3cfc3662e8ced70802fe02a5c05251d))
* spacing should use same values as padding ([da31637](https://github.com/reciprocity/zen-ui/commit/da31637ff32ff9e8299d2a75b7281ad22d523ad6))
* switch basic variant sizes ([71af29b](https://github.com/reciprocity/zen-ui/commit/71af29b17a8d1770d69d70de3701abc1207ef768))
* test coverage ([e09802c](https://github.com/reciprocity/zen-ui/commit/e09802c644604848f2f38227955a975eb9cb821d))
* update tests and vrt snapshots ([a744178](https://github.com/reciprocity/zen-ui/commit/a7441782a41a19b61edd81bfef06ec88b7f52c71))
* updated conditional ([d73a046](https://github.com/reciprocity/zen-ui/commit/d73a046f92c1d326fd2f931e671d939124c1cb9b))
* updated reflected indeterminate property and added $ convention ([ee50b68](https://github.com/reciprocity/zen-ui/commit/ee50b68abe8cab405f767f3d795f081eff536e04))
* **zen-avatar:** remove margins between tooltip items ([c58e7fe](https://github.com/reciprocity/zen-ui/commit/c58e7fe7463bc9be800225feb5fb1fda872662e4))
* **zen-avatar-details:** add none option to spacing prop ([384d8bb](https://github.com/reciprocity/zen-ui/commit/384d8bb4ce56c384c00388dc999fc251570f68c3))
* **zen-avatar-details:** horz align left ([670c949](https://github.com/reciprocity/zen-ui/commit/670c949dd1cd72b31966a861a00d8aa4baf7fc99))
* **zen-avatar-details:** revert `p` back to `padding` ([179843e](https://github.com/reciprocity/zen-ui/commit/179843eea2642c0b1a3011c3931210fa32aa37bb))
* **zen-icon:** revert `p` back to `padding` ([938e148](https://github.com/reciprocity/zen-ui/commit/938e148c8720f66c30aefdf4f5ef80321842e12d))
* **zen-skeleton:** support padding ([b9bd0bd](https://github.com/reciprocity/zen-ui/commit/b9bd0bdb7663932531162d9d4ea43bfecb50798a))
* **zen-space:** revert `p` back to `padding` for each story ([07694db](https://github.com/reciprocity/zen-ui/commit/07694db76c5e6be824c1640440da4aeb6121eee4))
* **zen-space:** revert prop `p` back to `padding` ([6f99587](https://github.com/reciprocity/zen-ui/commit/6f995879d30ecb7e8e53a2ac03abe57eb74399ec))
* sortable `padding` prop to `p` ([4108dcd](https://github.com/reciprocity/zen-ui/commit/4108dcdd89ec488d4e92c233f8d96d7f40361271))


### Features

* add clear button ([eec8e97](https://github.com/reciprocity/zen-ui/commit/eec8e978bb83bb1fed0ba7c68d4c48d7a459364b))
* add margins css ([f969617](https://github.com/reciprocity/zen-ui/commit/f96961723c499b82996f6476bdafba7cc218b4eb))
* add new padding props to zen-avatar-details ([0f7b0c1](https://github.com/reciprocity/zen-ui/commit/0f7b0c1dd110ac54251d0440c02debe292021dc5))
* add new padding props to zen-icon ([710e7e1](https://github.com/reciprocity/zen-ui/commit/710e7e1ca78e78c9b464143eec84050e4d7c0a91))
* add open close events ([226bc7d](https://github.com/reciprocity/zen-ui/commit/226bc7dce2d85d4fe0fda0a2e7ea6df171ceadb8))
* add option to hide clear button ([6d7ffd0](https://github.com/reciprocity/zen-ui/commit/6d7ffd0c9b59aba18b4f40e1fa9d5c264d18cfce))
* add props px, py, pt, pl, pr, pb to zen-space ([a0bd2ca](https://github.com/reciprocity/zen-ui/commit/a0bd2ca0cee92e4cbee8a352adadce4cf15b82f3))
* added invalid state to zen-datepicker ([d8e2c50](https://github.com/reciprocity/zen-ui/commit/d8e2c5092f1382062fd0a5eced2d3c8fc234076a))
* added invalid state to zen-dropdown ([e8ca539](https://github.com/reciprocity/zen-ui/commit/e8ca539156cecc120b831d951a899883d546f32f))
* added invalid state to zen-textarea ([3fa3ff2](https://github.com/reciprocity/zen-ui/commit/3fa3ff2c3338d110bea45e76ae195d3b0f1296e9))
* adds additional variant for the avatar detail component ([c0e664b](https://github.com/reciprocity/zen-ui/commit/c0e664b204a52f93ea491f843dbb28a2b5ef4823))
* adds stories for the new component variant possibilities ([1d6753e](https://github.com/reciprocity/zen-ui/commit/1d6753eee9bb3c734a03ecd079096cab910984fb))
* clear input on click ([9d809af](https://github.com/reciprocity/zen-ui/commit/9d809afea9f5584b738a9c523a62a9f3e7533c76))
* expose padding props ([c7f2935](https://github.com/reciprocity/zen-ui/commit/c7f2935ae7dff104337c55b9ae6191647f0db642))
* hide clear button if no input.value ([d922bb5](https://github.com/reciprocity/zen-ui/commit/d922bb50e48e074a5c3c6b42a74d85ea28e996f1))
* hide clear button if not input focused ([0bf840f](https://github.com/reciprocity/zen-ui/commit/0bf840fbf3d78a695720c0e9c79f0503e07d60b2))
* hide default clear button on date picker ([3787679](https://github.com/reciprocity/zen-ui/commit/3787679f5876cb3075e3fcc6ec4f9192bd74101e))
* reimplemented variants and added basic default and basic large ([5fa8d45](https://github.com/reciprocity/zen-ui/commit/5fa8d450e6c5a246ff01e747f79a608ccd8e5520))
* **zen-card:** add prop `padding` ([57079ff](https://github.com/reciprocity/zen-ui/commit/57079ffc5a639f807cd4f4ef6e950515c0673885))
* **zen-drawer:** add prop `padding` ([d5e7c05](https://github.com/reciprocity/zen-ui/commit/d5e7c05f3984ba72ac192840ca3e89ba5864a8cd))
* **zen-option:** add prop `padding` ([42711c5](https://github.com/reciprocity/zen-ui/commit/42711c5112226eb7a377d8f5a45ff4634288cbc8))
* **zen-panel:** add prop `padding` ([efb2f83](https://github.com/reciprocity/zen-ui/commit/efb2f8384562c79c77131ecd23f8f59d22cbb67c))
* **zen-popover:** add prop `padding` ([e5a28fb](https://github.com/reciprocity/zen-ui/commit/e5a28fb8b0e8bac5e7565ddd160ae95a00d9d616))
* **zen-popover:** remove zen-space wrappers from stories ([8351fd6](https://github.com/reciprocity/zen-ui/commit/8351fd6837ddca59a0ff6bf0f6e91fed49bc165f))
* **zen-skeleton:** add prop `padding` ([907190d](https://github.com/reciprocity/zen-ui/commit/907190d4a26e14f1e8cac8c574a4cd0a8a4e7caf))
* **zen-space:** add display block prop ([a93769b](https://github.com/reciprocity/zen-ui/commit/a93769b039b1a822f143f9759b2ecbaa50c31f22))
* **zen-space:** add margin prop ([77d4c30](https://github.com/reciprocity/zen-ui/commit/77d4c309b19376cf4519e431d927896139803c7d))
* **zen-text:** add prop state ([f33bd81](https://github.com/reciprocity/zen-ui/commit/f33bd81df9df078bd9816ec13368380dbc70f43d))
* **zen-tooltip:** add prop `padding` ([d85ae3f](https://github.com/reciprocity/zen-ui/commit/d85ae3f6152e65dee81c7acc33a9be98fb2d0e88))
* remove props paddingX and paddingY ([b2f74db](https://github.com/reciprocity/zen-ui/commit/b2f74dba893634e1dfa02fa3b0174aae6e734728))


### BREAKING CHANGES

* **zen-option:** `zen-option` - Prop `defaultPadding` removed.
Added prop `padding` to be able to control padding.
* **zen-tooltip:** `zen-tooltip` - Slot `content` removed.
Added prop `padding` to be able to control padding.
* **zen-card:** zen-card - default padding is 1 rem

## [0.1.7](https://github.com/reciprocity/zen-ui/compare/0.1.6...0.1.7) (2021-03-25)

### Bug Fixes

* Add possibility to override avatar group colors [#261](https://github.com/reciprocity/zen-ui/pull/261)
* Date picker is not closed properly if user type the date [#258](https://github.com/reciprocity/zen-ui/pull/258)
* Date picker width now can be changed [#252](https://github.com/reciprocity/zen-ui/pull/252)
* Dropdown receives focus but doesn't open [#251](https://github.com/reciprocity/zen-ui/pull/251)
* REQUEST: Datepicker default value [#250](https://github.com/reciprocity/zen-ui/pull/250)
* Reflect the change of the progress tracker active index [#245](https://github.com/reciprocity/zen-ui/pull/245)
* Remove negative margins from zen-space [#239](https://github.com/reciprocity/zen-ui/pull/239)


### Features

* Panel - Add animations [#260](https://github.com/reciprocity/zen-ui/pull/260)
* Skeleton component [#249](https://github.com/reciprocity/zen-ui/pull/249)
* Implement notifications/alerts [#241](https://github.com/reciprocity/zen-ui/pull/241)

### BREAKING CHANGES

* `zen-panel`: Padding is changed! Both header and content have default padding set.
* `zen-panel`: Zen-text is no longer wrapping header. Common header should be `<zen-text slot="header">Item title</zen-text>`

## 0.1.6 (2021-03-12)

### PRs merged in this release

* `PLAT-1470` Zen-space padding should default to 'none'
* `QUICK-FIX` Fix textarea height on resizing
* `PLAT-1430` Add zen text improvements
* `QUICK-FIX` Move Panel under Layout group
* `PLAT-1462` Checkbox with intermediate state
* `PLAT-1426` Add resize, row, cols properties
* `Revert PLAT-1250` Zen space elements after first one in slot have margin left set."
* `PLAT-1338` Add avatar details component
* `PLAT-1174` Remove form-group component
* `QUICK-FIX` ZenPanel: Correctly use dynamic prefix
* `PLAT-1357` Default value for date format is not applied to the date picker
* `PLAT-1358` Date picker is missing a X icon to remove the date from field
* `QUICK-FIX` Pin dependencies
* `PLAT-1389` Dropdown - Scroll on keyboard selection

### BREAKING CHANGES

* Removed component `zen-form-group`. Use component `zen-space` instead.

## 0.1.4 (2021-03-08)

### BREAKING CHANGES

* Tooltip: props `showDelay` and `hideDelay` have been joined into prop `delay`. (Note that delay still supports shorthand for show and hide prop.)

## 0.1.3 (2021-02-19)

### BREAKING CHANGES

* All zen components need to be prefixed.

## 0.1.2 (2021-02-17)

### BREAKING CHANGES

* `zen-space`: `width: 100%` isn't default anymore. Add attr `stretch` to make it `width: 100%`. In most cases this should have no impact.

## 0.1.1 (2021-02-16)

Bugfixes and new components.

## 0.1.0 (2021-02-01)

### BREAKING CHANGES

* Events prefixed by `zen-` were changed into native events.<br/>Eg. `zen-change` is now `change`.<br/>This affects the following components:
  - `zen-checkbox`
  - `zen-dropdown`
  - `zen-input`
  - `zen-textarea`
  - `zen-progress-tracker`
* Removed components: `zen-label` and `zen-support-text`. Use component `zen-text` with variant `label` or `support`
* `zen-spinner`: Prop `color` removed. To set custom color: `<zen-spinner style="color: #f00">`
* `zen-button`: Prop `label` removed. To set button label: `<zen-button>Click here</zen-button>`
* `zen-checkbox`: Prop `label` removed. To set checkbox label: `<zen-checkbox>Checkbox label</zen-checkbox>`
* Component `zen-steps` was renamed to `zen-progress-tracker`.

## 0.0.19 (2020-12-24)

### Bug Fixes

* Tooltip: Hide scroller if there's enough height

### Features

* Tooltip: New props `hasArrow`

## 0.0.18 (2020-12-23)

### Features

* Tooltip: new props `hideDelay`, `showDelay`
* Tooltip: new prop `maxHeight` which allows you to create scrollable tooltips
* Tooltip: tooltip will switch position if there's no room to show it

## 0.0.17 (2020-12-22)

#### Bug Fixes

* Dropdown: prevent closing dropdown on scrolling using the scrollbar
* Dropdown: The height of the field should follow the height of `<zen-dropdown>` tag

#### Features

* Dropdown: Added slot `placeholder`
* Dropdown: Added prop `disabled`
* Dropdown: Selected item is copied into the field, so the item in the field is styled correctly (has the same content as an original item - icons, padding & stuff)
* Zen-option: Added prop `disabled`

#### BREAKING CHANGES

* Dropdown: slot `options` is now the default slot
* Zen-option: slot `label` is now the default slot
