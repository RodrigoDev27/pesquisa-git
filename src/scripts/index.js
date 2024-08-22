

    document.getElementById('btn-search').addEventListener('click', () => {
        const userName = document.getElementById('input-search').value
        if(userName.length === 0){
            alert("Preencha o campo com o nome do usuario do Github")
            return
        }
        
      

        getUserProfile(userName)
    })
    

    document.getElementById('input-search').addEventListener('keyup', (e) => {
        const userName = e.target.value
        const key = e.which || e.keyCode
        const isEnterKeyPressed = key === 13

        if(isEnterKeyPressed){
            if(userName.length === 0){
                alert("Preencha o campo com o nome do usuario do Github")
                return
            }
            getUserProfile(userName)
        }
    })
 

//inicio
    async function user(userName){
        const response = await fetch(`https://api.github.com/users/${userName}`)
        return await response.json()

    }

    async function repos(userName){
        const response = await fetch(`https://api.github.com/users/${userName}/repos`)
        return await response.json()

    }



    function getUserProfile(userName){ 

         
        
        user(userName).then(userData => {       
            console.log(userData)
        
            let userInfo = `<div class="info">
                                <img src="${userData.avatar_url}" alt="Foto do perfil" />                                         
                                <div class="data">
                                <h1>${userData.name ?? 'Não pussui nome cadastrado 😥'}</h1>
                                <p>${userData.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                </div>
                            </div> `


            document.querySelector('.profile-data').innerHTML = userInfo

           
          
            getUserRepositore(userName)
                

        })
        re
       
            
           
    }
   

    function getUserRepositore(userName){
        repos(userName).then(reposData =>{
            let repositoriesItens = ""
            
            reposData.forEach(repo => {
                repositoriesItens += `<li><a href="${repo.html_url}" target="_blanck">${repo.name}</a></li>`
            })
                                    
            document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositorio</h2>
                                                                <ul>${repositoriesItens}</ul>
                                                                </div> `  
                                    
        })
       
    }
   
    