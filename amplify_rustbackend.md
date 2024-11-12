# CASCADE RETINA with RUST BACKEND


Taken from:

https://medium.com/@maicon.pavi/how-to-use-rust-in-aws-amplify-6c2252a6e461


#### SETUP RUST STUFF
```sh
cd /Users/sfurlan/Dropbox/Family/Julie/Practice/website/website
npm install -g @aws-amplify/cli
cargo install trunk
rustup target add wasm32-unknown-unknown
```

#### CREATE APP
```sh

amplify init

```


#### Create yml in root of project


call this amplify.yml
```yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        # install rust
        - curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        - source ~/.cargo/env
        # install trunk
        - cargo install trunk
        # add WASM target
        - rustup target add wasm32-unknown-unknown
    build:
      commands:
        - trunk build --release
  artifacts:
    baseDirectory: dist
    files:
      - "**/*"
  cache:
    paths:
      - target/**/*
```

Setup rust files
```sh
cargo init

```

Edit Cargo.toml to have these dependencies

```txt
yew = "0.19"
gloo-net = "0.2"
serde = { version = "1.0", features = ["derive"] }
wasm-bindgen-futures = "0.4"


```


Create index.html in root

```html
<!DOCTYPE html>
<html lang="en">
    <head> 
        <meta charset="utf-8">
        <title>My First Web Page</title>
    </head>
    <body></body>
</html>


```

Create this in src/main.rs


```rs
use gloo_net::{http::Request, Error};
use yew::prelude::*;
use serde::Deserialize;
#[derive(Properties, PartialEq, Deserialize, Clone)]
struct CatFactProps {
    fact: String,
}
async fn fetch_cat_fact() -> Result<CatFactProps, Error> {
    Request::get("https://catfact.ninja/fact")
        .header("Accept", "application/json")
        .send()
        .await?
        .json::<CatFactProps>()
        .await
}
#[function_component(CatFact)]
fn cat_fact(props: &CatFactProps) -> Html {
    html! {
        <div>
            <h1>{ format!("{}", props.fact) }</h1>
        </div>
    }
}
#[function_component(App)]
fn app() -> Html {
    let fetched_cat_fact = use_state(|| CatFactProps {
        fact: "".to_string(),
    });
    let counter = use_state(|| 0);
    
    let onclick = {
        let counter = counter.clone();
        Callback::from(move |_| counter.set(*counter + 1))
    };
{
        let fetched_cat_fact = fetched_cat_fact.clone();
        use_effect_with_deps(
            move |_| {
                wasm_bindgen_futures::spawn_local(async move {
                    match fetch_cat_fact().await {
                        Ok(cat_fact) => {
                            fetched_cat_fact.set(cat_fact);
                        }
                        Err(err) => {
                            fetched_cat_fact.set(CatFactProps {
                                fact: err.to_string(),
                            });
                        }
                    }
                });
                || ()
            },
            counter,
        );
    }
html! {
        <div>
            <h1>{"Cat Fact"}</h1>
            <CatFact fact={(*fetched_cat_fact).clone().fact}/>    
            <button {onclick} > <h3>{"Another Fact"}</h3> </button>
        </div>
    }
}
fn main() {
    yew::start_app::<App>();
}


```


Add these to the .gitignore

```txt

target
dist
**/*.rs.bk
```


## THIS TOTALLY WORKED
