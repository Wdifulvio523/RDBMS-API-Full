const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

//Root 
server.get('/', (req, res) => {
    res.send('We runnin....')
  })


//Users 
//Get Users
server.get('/users', (req, res) => {
    db('users')
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err))
})


//Post New User
server.post('/users', (req, res) => {
    const user = req.body;
    db()
    .insert(user)
    .into('users')
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Get Specific User By ID
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users')
    .where("id", Number(id))
    .then(user => {
        if (user.length === 0) {
            res
              .status(404)
              .json({ mesage: "The user with the specified ID does not exist." });
          }
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//UpdateUser
server.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const name = req.body;
    db('users')
    .where("id", Number(id))
    .update(name)
    .into('users') //can we remove this?
    .then(name => {
        res.status(201).json(name)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Delete User
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users')
    .where("id", Number(id))
    .delete()
    .then(users => {
        if(users.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting user"})
    });
})


//Get Posts for a User by User ID
server.get('/users/:id/posts', (req, res) => {
    db('posts')
    .where('userId', req.params.id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(200).send({error: "This user has not posted"});
        }
        res.status(200).json(posts);
    })
    .catch(err => res.status(500).json(err));
})



//Posts ---------------------------------------------------------
//Get posts
server.get('/posts', (req, res) => {
    db('posts')
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err))
})


//Post post
server.post('/posts', (req, res) => {
    const {userId, text } = req.body;
        if (!userId || !text)
    res.status(400).json({ errorMessage: "Text required"});    db
    .insert({userId, text})
    .into('posts')
    .then(post => {
    res.status(201).json({userId, text})
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Get Post By ID
server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where("id", Number(id))
    .then(post => {
        if (post.length === 0) {
            res
              .status(404)
              .json({ mesage: "The post with the specified ID does not exist." });
          }
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Delete Post
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where("id", Number(id))
    .delete()
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting post"})
    });
})


//Update Post
server.put('/posts/:id', (req, res) =>{
    const { id } = req.params;
    const {userId, text} = req.body;
    db('posts')
    .where("id", Number(id))
    .update({userId, text})
    .into('posts')
    .then(name => {
        res.status(201).json({userId, text})
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

// Get tags for a specific post by PostId
server.get("/posts/:id/tags", (req, res) => {
    db("tags")
    .where("postId", req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({message: "the tags with that ID do not exist"})
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({error: "POst info coult not be retrieved"})
    })
})



//Tags --------------------------------------------------------------------------------------
//Get tags
server.get('/tags', (req, res) => {
    db('tags')
    .then(tag => {
        res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(tag))
})


//Post tag
server.post('/tags', (req, res) => {
    const tag = req.body;
    db
    .insert(tag)
    .into('tags')
    .then(tag => {

        res.status(201).json(tag)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Get tag By ID
server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where("id", Number(id))
    .then(tag => {
        if (tag.length === 0) {
            res
              .status(404)
              .json({ mesage: "The tag with the specified ID does not exist." });
          }
        res.status(200).json(tag)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Delete Tag
server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where("id", Number(id))
    .delete()
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting tag"})
    });
})

//Update Tag
server.put('/tags/:id', (req, res) =>{
    const { id } = req.params;
    const tag = req.body;
    db('tags')
    .where("id", Number(id))
    .update(tag)
    .into('tags')
    .then(tag => {
        res.status(201).json(tag)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})



const port = 8000;
server.listen(port, function() {
    console.log(`\n===Yo,your Web API Listening on http://localhost:${port} ===\n`);
});