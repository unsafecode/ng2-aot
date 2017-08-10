# ng2-aot - Working Angular4 demo app with AoT and lazy routes
Inspired from [@ngtools/webpack](https://github.com/angular/angular-cli/tree/master/tests/e2e/assets/webpack/test-app) internal tests, 
this little Angular2 app shows how to AoT compilation with lazy routes.

## TL;DR
`@ngtools/webpack` actually works quite nicely and enables Angular2 AoT compilation, 
in a `webpack` project, but there are some caveats with `tsconfig.json` to watch for.

## Why?


## Structure
- webpack@3.5.2
- angular@4.3.3
- @ngtools/webpack@1.5.5
- typescript@2.4.2

## Key points
While using the AoT Plugin looks simple, there are _many_ caveats to watch for, that
may totally compromise the build.

1. **You don't need a `main.aot.ts`**: 
    most examples with AoT use a different entry point when using Aot, This is actually not required
    when using the `@ngtools/webpack` loader:

    ```typescript
    module: {
        loaders: [
        // ...
        { test: /\.ts$/, loader: ['@ngtools/webpack'] }
        ]
    },
    ```

    Because of this, you don't need any change and can still use the same entry point 
    (`main.jit.ts` in this repo)

    **NOTE** Make sure NOT to include an AoT-specific entry point, otherwise TypeScript will compile it
    and throw an error like _XXXModule.ngfactory could not be found.

2.  `tsconfig.json` setup
    One key aspect concerns a few settings in the `tsconfig.json` file used for Aot.
    You need to specify one in the Webpack config this way:
    
    ```typescript
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json'
        })
    ],
    ```

    In a more complex project, you will likely have two: one for AoT, say `tsconfig.aot.json` and
    another one for development, `tsconfig.json`.

    **The key settings are the following:**
    - `"baseUrl": "."` is critical to ensure TypeScript correctly resolves module paths
        when compiling. If you get errors like _XXXModule is not an NgModule_, that's because
        the TypeScript compiler couldn't load the file and parse it.
    - `"entryModule":"app/app.module#AppModule"` can be specified here, if the previous settings
        is matching.

## Usage
1. `npm install`
2. `npm start`
3. Watch webpack compile just fine
4. Open browser at `http://localhost:9000`
5. Open F12 Developer Tools
6. Navigate the link and watch for network calls: the LazyModule should be loaded on demand (`1.chunk.js`).
