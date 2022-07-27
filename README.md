# BoxRec Mocks

Makes request to [BoxRec](boxrec.com) and saves the pages as HTML files.  To be used for testing purposes.

## ❌ Deprecated/Archived ❌

This repository has been deprecated and stopped used in favour of using what's live to the public.


## Installation

`yarn add boxrec-mocks -D`

or

`npm install boxrec-mocks -D`

## Generating the mocks

Set environment variables

```
export BOXREC_USERNAME=
export BOXREC_PASSWORD=
```

and then run

```
yarn start
```

## Usage (importing into other projects for testing purposes)

`npm link` this project to your project

then in your project import it

```
// import all
import * as BoxrecMocks from "boxrec-mocks";
```

or

```
// import one mock
import {mockMiddleweightWBCBelt} from "boxrec-mocks";
```

or

```
// import all
const boxrecMocks = require("boxrec-mocks");
```
 

## Note
Not affiliated with the website [BoxRec](http://www.boxrec.com)
