(() => {
    const div = document.getElementById('cards')
    div.classList.add('d-flex','justify-content-center', 'align-items-center', 'p-5')
    
    function createCard(num) {
        const colCard = document.createElement('div')
        const card = document.createElement('div')
        const cardBody = document.createElement('div')
        const cardTitle = document.createElement('h5')
        const cardText = document.createElement('p')

        colCard.classList.add('col-6', 'col-sm-6', 'col-lg-3', 'mb-2')
        card.classList.add('card')
        card.setAttribute('data-num', `${num}`)

        cardBody.classList.add('card-body', 'border', 'rounded-3', 'border-2', 'border-primary')
        cardTitle.classList.add('card-title', 'text-center')
        cardText.classList.add('card-text', 'text-center')

        cardTitle.textContent = num
        cardText.textContent = 'Номер данной карточки'

        cardBody.append(cardTitle)
        cardBody.append(cardText)
        card.append(cardBody)
        colCard.append(card)

        return {
            cardTitle,
            cardBody,
            colCard
        }

    }

    function startInfo () {
        const divStart = document.createElement('div')
        const hello = document.createElement('h2')
        const button = document.createElement('button')
        const input = document.createElement('input')
        const divWrapper = document.createElement('div')
        const discriptions = document.createElement('p')
        discriptions.textContent = 'Введите количество полей для игры'


        divStart.classList.add('col-sm-4', 'border','rounded-3', 'border-2', 'border-primary', 'p-4', 'center-block')
        divWrapper.classList.add('col-1', 'input-group', 'mb-3',)
        button.classList.add('btn', 'btn-primary',)
        input.classList.add('form-control')

        // input.type = 'number'

        button.textContent = 'Начнем игру?'
        hello.textContent = 'Приветствуем игроков'

        divWrapper.append(input)
        divWrapper.append(button)
        divStart.append(hello)
        divStart.append(discriptions)
        divStart.append(divWrapper)

        return {
            divStart,
            hello,
            button,
            input
        }

    }

    function gamesField(totalCard) {
        const field = document.createElement('div')
        field.classList.add('row')
        const arr = createArray(totalCard)
        const cardList = []

        for (let i = 0; i < arr.length; ++i) {
            const arrNested = arr[i]
            for(let j = 0; j < arrNested.length; j++) {
                cardList.push(createCard(arrNested[j]).colCard)
            }
        }
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }

        const newArr = shuffle(cardList)
        
        for(let obj of newArr) {
            field.append(obj)
        }

        return {
            field,
            cardList
        }
    }

    function createArray (totalCard) {
        const arr = []
        for(let i = 1; i <= totalCard/2; i++) {
            arr.push([i, i])
        }
        return arr
    }

    function startGames () {
        const start = startInfo()

        div.append(start.divStart)

        start.button.addEventListener('click', function(e) {
            e.preventDefault()
            if (!start.input.value || start.input.value > 9 || start.input.value%2 !== 0) {
                alert('Требуеться что то ввести')
                return
            }
        
            const totalCard = Number(start.input.value) 
            start.input.value = ''
            start.divStart.remove()

            div.append(gamesField(totalCard).field)

            const arrayCards = document.querySelectorAll('.card')

            let hasFlippedCard = false
            let lockBoard = false
            let win = false
            let firstCard, secondCard
            
            function flipCard() {
                this.classList.add('flip')

                if (!hasFlippedCard) {
                    hasFlippedCard = true
                    firstCard = this
                    return
                }

                secondCard = this
                compareCard()
                if(win) {
                    alert('Вы выиграли')
                }
            }

            function compareCard() {
                let isMatch = firstCard.dataset.num === secondCard.dataset.num
                if (isMatch) {
                    disableCard()
                } else {
                    unflipCard()
                }
            }

            function disableCard() {
                firstCard.removeEventListener('click', flipCard)
                secondCard.removeEventListener('click', flipCard)
                resetBoard()
            }

            function unflipCard() {
                lockBoard = true
                setTimeout(() => {
                    firstCard.classList.remove('flip')
                    secondCard.classList.remove('flip')
                    resetBoard()
                }, 1000)
            }

            function resetBoard() {
                [hasFlippedCard, lockBoard] = [false, false]
                [firstCard, secondCard] = [null, null]
                if(changeWin(arrayCards, totalCard)) {
                    win = true
                }
            }

            function changeWin(arrayCards,totalCard) {
                let newArrayCard = Array.from(arrayCards)
                let arrayCardsFilter = newArrayCard.filter(function(obj) {
                    return obj.className === 'card flip'
                })
                if(arrayCardsFilter.length === totalCard) {
                    return true
                } else {
                    return false
                }
            }

            arrayCards.forEach(item => {
                item.addEventListener('click', flipCard)
            })
        })
    }
    window.addEventListener('DOMContentLoaded', function() {
        startGames()
    })
})()
