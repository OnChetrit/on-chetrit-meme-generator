'use strict'

let gImgs = [];
let gTags = {};


createImgs();



function createImgs() {
    // const memes = loadFromStorage('memesDB');

    createImg(1, ['politics', 'funny', 'man'])
    createImg(2, ['animal', 'dog'])
    createImg(3, ['animal', 'dog', 'baby'])
    createImg(4, ['animal', 'cat'])
    createImg(5, ['baby', 'funny'])
    createImg(6, ['crazy', 'funny', 'man', 'smiling'])
    createImg(7, ['baby', 'funny', 'cute'])
    createImg(8, ['man', 'smiling'])
    createImg(9, ['baby', 'evil', 'laughing'])
    createImg(10, ['politics', 'laughing', 'man'])
    createImg(11, ['man', 'kissing', 'sports'])
    createImg(12, ['man', 'pointing'])
    createImg(13, ['man', 'cheers', 'smiling', 'movie', 'celebrity'])
    createImg(14, ['man', 'seriouse', 'sunglasses', 'movie'])
    createImg(15, ['man', 'explaining', 'movie'])
    createImg(16, ['man', 'laughing', 'surprised', 'movie'])
    createImg(17, ['man', 'explaining', 'pointing', 'politics'])
    createImg(18, ['pointing', 'movie', 'explaining', 'scared', 'sad'])
    createImg(19, ['pointing', 'funny', 'scared'])
    createImg(20, ['funny', 'movie'])
    createImg(21, ['baby', 'funny', 'smiling', 'laughing'])
    createImg(22, ['inspiring'])
    createImg(23, ['politics', 'man', 'celebrity', 'funny'])
    createImg(24, ['funny', 'animal', 'dog', 'sports'])
    createImg(25, ['celebrity', 'laughing'])
}
function createImg(id, tags) {
    let img = {
        id,
        url: `img/${id}.jpg`,
        tags
    }
    gImgs.push(img);
}

///////////////////////// GETS /////////////////////////
function getImgs() {
    return gImgs
}
function getTags() {
    return gTags
}
function getImgById(imgId) {
    return gImgs.find(img => img.id === +imgId)
}


// function updateTags() {
//     gImgs.forEach((img) => {
//         img.tags.forEach((tag) => {
//             if (!gTags[tag]) {
//                 gTags[tag] = 1;
//                 return;
//             }
//             gTags[tag]++;
//         });
//     });
// }
