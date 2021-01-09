const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async () => {
  //* Crea un nuevo post y lo enlaza con un usuario mediante su email
  const post = async () => {
    await prisma.post.create({
      data: {
        title: "Prisma hace las bases de datos más sencillas",
        author: {
          connect: { email: "sarah@prisma.io" }
        }
      }
    })
  }
  //console.log(await post())

  //* Actualiza la publicación para activar la propiedad de "publicado"
  const postUpdate = async () => {
    await prisma.post.update({
      where: { id: 2 },
      data: { published: true }
    })
  }
  //console.log(await postUpdate())

  //* Borrar posts repetidos
  const deleteRepeatedPosts = async () => {
    //? Borra los posts repetidos filtrado por el título si la ID no es 19
    const deletePost = await prisma.post.deleteMany({
      where: { title: 'Prisma hace las bases de datos más sencillas', NOT: { id: 19 } }
    })
    console.log(deletePost)
    //? Muestra los posts restantes
    const allPosts = await prisma.post.findMany({
      where: { title: 'Prisma hace las bases de datos más sencillas' }
    })
    console.log(allPosts)
  }
  //console.log(await deleteRepeatedPosts())

  //* Obtiene todos usuarios de la db, incluyendo los posts con los que están relacionados.
  const allUsers = await prisma.user.findMany({
    include: { posts: true }
  })
  //console.dir(allUsers, { depth: null })//? Se usa console.dir para poder ver bien objectos enlazados
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
