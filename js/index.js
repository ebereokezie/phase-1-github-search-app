document.addEventListener("DOMContentLoaded",() => {
let searchForm = document.getElementById("github-form")
searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let searchBar = document.getElementById("search")
    let textInput = searchBar.value
    fetch(`https://api.github.com/search/users?q=${textInput}`)
    .then(res => res.json())
    .then(data => {
        let newData = Object.values(data.items)
        newData.forEach(pullFromArray)
    }
    )
    searchForm.reset()
})

function pullFromArray(e){
    let orderedList = document.createElement("ol")
    let bulletList = document.createElement("li")
    let avatarPicture = document.createElement("img")
    orderedList.textContent = `${e.login}`
    avatarPicture.src = `${e.avatar_url}`
    bulletList.textContent = `${e.html_url}`

let searchResults = document.getElementById("user-list")
searchResults.appendChild(orderedList)
searchResults.appendChild(bulletList)
searchResults.appendChild(avatarPicture)

bulletList.addEventListener("click",() => 
fetch (`https://api.github.com/users/${e.login}/repos`)
.then(res => res.json())
.then(data=> {
   let repData = Object.values(data)
   let repoList = document.getElementById("repos-list")
   repoList.textContent = ""
   repData.forEach((e)=>{
       let list = document.createElement("li")
       list.textContent = `${e.name}`
       
       
       repoList.appendChild(list)
          })
        })
    )
}
}
)
