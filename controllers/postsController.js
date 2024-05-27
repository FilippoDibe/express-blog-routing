const path = require("path");
const fs = require("fs");
let posts = require("../DB/db.js")


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
                res.json(postRichiesta);
            } else {
                res.status(404).json({ error: "Post not found" });
            }
        }
    });
};


module.exports = {
    index, 
    show,
  
}