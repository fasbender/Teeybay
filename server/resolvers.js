const Post = require('./post')

const resolvers = {
    Query: {
        getAll: async() => {
            try {
                return await Post.find()
            } catch (error) {
                console.log(error)
            }
        },
        singlePost: async(_, {id}) => {
            try {
                return await Post.findById(id)
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        createPost: async(parent, args, context, info) => {
            const {
                title, 
                description
            } = args.post
            
            const post = await new Post({
                title,
                description
            }).save()
            return post
        },
        updatePost: async(parent, args, context, info) => {
            const { id } = args
            const {
                title, 
                description
            } = args.post
            
            const post = await Post.findByIdAndUpdate(id, {
                title,
                description
            }, {
                new: true
            })
            return post
        },
        deletePost: async(parent, args, context, info) => {
            const { id } = args
            await Post.findByIdAndDelete(id)
            return "Deleted"
        }
    }
}

module.exports = resolvers