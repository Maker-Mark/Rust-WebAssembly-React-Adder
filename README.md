## Set up a basic rust app

    - We can use rust's cargo pkg manager to get the basic program started
    - Use `cargo new name_of_project --lib`
        - We added the --lib flag as we just need the library, as we are not running the rust independently

## Add targets via rustup

    - We want wasm support using any system support
    - `rustup target add wasm32-unknown-unknown --toolchain nightly`
        - If we are missing nightly do `rustup default nightly`

## Updating our .toml

    - We need to add a crate-type in our toml to signify our dynamic crate-type
     ```

    [lib]
    crate-type = ["cdylib"]
    ```

## Let's have cargo build this

    - ` cargo +nightly build --target wasm32-unknown-unknown --release`
        - The --release flag tells the builder to skip the debug files
    - Now we should have a ` target` folder!

## Where our wasm lives

    - Go to `./target/wasm-unknown-unknown/release/wasm_adder.wasm`
    - This is the file that we copy and put in our JS!

## Now we need to set up a JS project to sever this

    - I'm going to use `npx create-react-app app-name`
        - Use anything that serves a app locally!
    - We can add our wasm in just a few steps
        1. Move the wasm file `./target/wasm-unknown-unknown/release/wasm_adder.wasm` above to our public folder, or anywhere your js program that your main.js will know to look
        2. Import the object via the JS api near your other main imports
             ```const importObject = {

imports: { imported_func: arg => console.log(arg) }
}```

            3.In your main return/rendering function, add:
            ``` //We can use the global WebAssembly object and use the instantiateStreaming

                // We want to stream the file we want to fetch, we use a fetch call witha promise!
                WebAssembly.instantiateStreaming(fetch("wasm_adder.wasm"), importObject).then(
                obj => {
                console.log(obj);
                let foo = obj.instance.exports.add_nums;
                console.log(foo(3, 2));
    }

)```

## Current Limitations

    - Only using wasm, we can currently just use certain params/inputs into our wasm code
    - HOWEVER, we can learn more about using something called `wasm-bindgen` which will let us pass back and forth more complex "stuff". Like objects, array's and so on.
