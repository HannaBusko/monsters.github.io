function loadBigCards() {
    return [
        { "id": "car", "src": "./img/bigCards/monstr5_car.png" }, { "id": "car", "src": "./img/bigCards/monstr5_car.png" },
        { "id": "ball", "src": "./img/bigCards/monstr4_ball.png" }, { "id": "ball", "src": "./img/bigCards/monstr6_ball.png" },
        { "id": "ballon", "src": "./img/bigCards/monstr2_ballon.png" }, { "id": "ballon", "src": "./img/bigCards/monstr2_ballon.png" },
        { "id": "bear", "src": "./img/bigCards/monstr5_bear.png" }, { "id": "bear", "src": "./img/bigCards/monstr7_bear.png" },
        { "id": "bike", "src": "./img/bigCards/monstr6_bike.png" }, { "id": "bike", "src": "./img/bigCards/monstr6_bike.png" },
        { "id": "doll", "src": "./img/bigCards/monstr4_doll.png" }, { "id": "doll", "src": "./img/bigCards/monstr1_doll.png" },
        { "id": "drum", "src": "./img/bigCards/monstr2_drum.png" }, { "id": "drum", "src": "./img/bigCards/monstr3_drum.png" },
        { "id": "duck", "src": "./img/bigCards/monstr6_duck.png" }, { "id": "duck", "src": "./img/bigCards/monstr1_duck.png" },
        { "id": "jula", "src": "./img/bigCards/monstr8_jula.png" }, { "id": "jula", "src": "./img/bigCards/monstr8_jula.png" },
        { "id": "plane", "src": "./img/bigCards/monstr3_plane.png" }, { "id": "plane", "src": "./img/bigCards/monstr7_plane.png" }
    ];
}

function loadSmallCards() {
    return [
        { "id": "ball", "src": "./img/smallCards/ball.png" }, { "id": "ballon", "src": "./img/smallCards/ballon.png" },
        { "id": "bear", "src": "./img/smallCards/bear.png" }, { "id": "bike", "src": "./img/smallCards/bike.png" },
        { "id": "car", "src": "./img/smallCards/car.png" }, { "id": "doll", "src": "./img/smallCards/doll.png" },
        { "id": "drum", "src": "./img/smallCards/drum.png" }, { "id": "duck", "src": "./img/smallCards/duck.png" },
        { "id": "jula", "src": "./img/smallCards/jula.png" }, { "id": "monster_card", "src": "./img/smallCards/monster_card.png" },
        { "id": "plane", "src": "./img/smallCards/plane.png" }, { "id": "socks", "src": "./img/smallCards/socks.png" }
    ];
}

function initGame() {
    constantVariables.smallOpenedCard = "";
    constantVariables.hasOpenedCard = false,
        sortBigCards(loadBigCards());
    sortSmallCards(loadSmallCards());
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function sortBigCards(bigCards) {
    let sortArr = [];
    let start = 0;
    let bigCardNumber = 20;
    while (start < bigCardNumber) {
        sortArr.push(start++);
    }
    sortArr.sort(compareRandom);

    for (let i = 0; i < sortArr.length; i++) {
        bigCards[i]["numTemp"] = sortArr[i];
    }
    bigCards.sort((a, b) => {
        return a.numTemp - b.numTemp;
    });
    addBigCards(bigCards);
}

function sortSmallCards(smallCards) {
    let sortArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    sortArr.sort(compareRandom);

    for (let i = 0; i < sortArr.length; i++) {
        smallCards[i]["numTemp"] = sortArr[i];
    }

    addSmallCards(smallCards);
    addListenersSmall();
}

function addBigCards(bigCards) {
    //первая колода = 8 карт, 2 колода и 3 колода по 6 карт, итого распределено 20 карт
    let numFirst = 8;
    let numSecond = 14;

    /*let firstDack = document.getElementById("firstCardDeck");
    let secondDack = document.getElementById("secondCardDeck");
    let thirdDack = document.getElementById("thirdCardDeck");*/
    let dacks = [
        document.getElementById("firstCardDeck"),
        document.getElementById("secondCardDeck"),
        document.getElementById("thirdCardDeck")
    ]

    let openedCard = { "cardDeckNumber": 0, "id": bigCards[0].id };
    constantVariables.openedBigCards.push(openedCard);
    bigCards.forEach((value, key) => {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", value.src);
        newImg.setAttribute("alt", value.id);
        newImg.setAttribute("data-img", value.id);
        if (key < numFirst) {
            newImg.setAttribute("class", "frontFaceFirst");
            dacks[0].prepend(newImg);
        }
        else if (key >= numFirst && key < numSecond) {
            newImg.setAttribute("class", "frontFaceSecond");
            dacks[1].prepend(newImg);
        }
        else {
            newImg.setAttribute("class", "frontFaceThird");
            dacks[2].prepend(newImg);
        }
    });

    dacks.forEach(value=>{
        let newImg = document.createElement("img");
        newImg.setAttribute("src", "img/glass.png");
        newImg.setAttribute("alt", "broken glass");
        newImg.setAttribute("class", "glass");
        value.prepend(newImg);
    });
}

function addSmallCards(smallCards) {
    let allSmallCards = document.getElementsByClassName("smallCards");
    smallCards.forEach(value => {
        let newImg = document.createElement("img");
        newImg.setAttribute("src", value.src);
        newImg.setAttribute("class", "frontFace");
        newImg.setAttribute("alt", "frontFace");
        allSmallCards[value.numTemp].prepend(newImg);
        allSmallCards[value.numTemp].setAttribute("data-img", value.id);
    });
}

function addListenersSmall() {
    let allSmallCards = document.querySelectorAll(".smallCards");
    for (let i = 0; i < allSmallCards.length; i++) {
        allSmallCards[i].addEventListener('click', openCard);
    }
}