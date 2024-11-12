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
