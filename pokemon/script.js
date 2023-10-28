// // const res =
// // async function imprime1(){
// //     setTimeout(()=>{
// //         console.log("1")
// //     },2000)
// // } 
// // async function imprime2(){
// //     await imprime1()
// //     console.log("2")
// // }
// // imprime2()
const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1")
const pokemonsJson = await pokemons.json()
console.log(pokemonsJson)
const ul = document.querySelector(".poke-ul")

renderList(pokemonsJson.results)

function renderList(list = []) {

    ul.innerHTML = ""
    list.forEach(async (pokemon) => {
        const pokemonInfos = await fetch(pokemon.url)
        const infosJson = await pokemonInfos.json()

        ul.insertAdjacentHTML("beforeend", `
         <div>
         <li id="${infosJson.id}">
         <img src=${infosJson.sprites.front_default} >
         <p class="nomePokemon">${pokemon.name}</p>
         </li>
         </div>
         `)
        const li = document.getElementById(infosJson.id)
        li.addEventListener("click", () => {
            navigateToPokemon(infosJson)
        })
        const info = document.querySelector("#info")
        info.addEventListener("click", () => {
            console.log(infosJson)
            console.log(infosJson.stats[0].stat.name)
            console.log(infosJson.stats[0].base_stat)
            li.insertAdjacentHTML("beforeend", `
         <div class="info">
         <li id="${infosJson.id}">
         <p class="info_hp">${infosJson.stats[0].stat.name}:${infosJson.stats[0].base_stat}</p>
         <p class="info_atk">${infosJson.stats[1].stat.name}:${infosJson.stats[1].base_stat}</p>
         <p class="info_def">${infosJson.stats[2].stat.name}:${infosJson.stats[2].base_stat}</p>
         <p class="info_spatk">${infosJson.stats[3].stat.name}:${infosJson.stats[3].base_stat}</p>
         <p class="info_spdef">${infosJson.stats[4].stat.name}:${infosJson.stats[4].base_stat}</p>
         <p class="info_spd">${infosJson.stats[5].stat.name}:${infosJson.stats[5].base_stat}</p>
         </li>
         </div>
         `)
        })
        

    })
}

let offset = 0
const nextBtn = document.querySelector("#next-page")
nextBtn.addEventListener("click", async () => {
    offset = offset + 1
    prevBtn.removeAttribute("disabled")

    try {
        nextBtn.setAttribute("disabled", true)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=1`)
        const resJson = await res.json()
        renderList(resJson.results)
    } catch (error) {
        console.log(error)
    }

    setTimeout(() => {
        nextBtn.removeAttribute("disabled")
    }, 500);
})

const prevBtn = document.querySelector("#prev-page")
prevBtn.addEventListener("click", async () => {
    offset = offset - 1

    if (offset < 0) {
        prevBtn.setAttribute("disabled", true)
        offset = 0
    } else {
        try {
            prevBtn.setAttribute("disabled", true)
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=1`)
            const resJson = await res.json()
            renderList(resJson.results)
        } catch (error) {
            console.log(error)
        }
        prevBtn.removeAttribute("disabled")
    }

})


