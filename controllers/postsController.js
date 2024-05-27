const path = require("path");
const fs = require("fs");

let posts = require("../DB/db.js");


const index = (req, res) => {
    res.format({
        html: () => {
            let html = `<div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">`;
            posts.forEach(({ title, content, image, tags }) => {
                html += `
                    <div>
                        <h2>${title}</h2>
                        <img src="imgs/posts/${image}" heigth="100px" width="250px"/>
                        <h6 style=" width:500px;">${content}</h6>
                `;
                tags.forEach(tag => html += `<ul><li>${tag}</li></ul>`);
                html += `
                    </div>
                `;
            });
            html += '</div>';
            res.send(html);
        },
    })

}

const show = (req, res) => {
    const slugPostRichiesta = req.params.slug;
    const postRichiesta = posts.find(post => post.slug === slugPostRichiesta);

    res.format({
        json: () => {
            if (postRichiesta) {
                const image_url = `http://${req.headers.host}/imgs/posts/${postRichiesta.image}`;

                const image_download_url = `http://${req.headers.host}/posts/${slugPostRichiesta}/download`;

                const postWithUrls = {
                    ...postRichiesta,
                    image_url: image_url,
                    image_download_url: image_download_url
                };
                
                res.json(postWithUrls);
            } else {
                res.status(404).json({ error: "Post not found" });
            }
        }
    });
};


const create = (req, res) => {
    res.format({
        html: () => {
            res.send('<h1>Nuovo post creato con successo!</h1>');
        },
        default: () => {
            res.status(406).send('Not Acceptable');
        }
    });
};

const downloadImage = (req, res) => {
    const slug = req.params.slug;
    const encodedSlug = encodeURIComponent(slug);
    const imagePath = path.join(__dirname, `../public/imgs/posts/${encodedSlug}.jpeg`);
    if (fs.existsSync(imagePath)) {
        res.download(imagePath);
    } else {
        res.status(404).send('Image not found.');
    }
};




module.exports = {
    index, 
    show,
    create,
    downloadImage
}