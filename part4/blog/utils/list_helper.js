const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const calcFrequency = (map, item) => {
    if (map.has(item.author)) {
      map.set(item.author, map.get(item.author) + 1)
    } else {
      map.set(item.author, 1)
    }
    return map
  }

  let frequency = (blogs.reduce(calcFrequency, new Map()))

  return biggestValue(frequency)
}

const mostLikes = (blogs) => {
  const calcLikes = (map, item) => {
    if (map.has(item.author)) {
      map.set(item.author, map.get(item.author) + item.likes)
    } else {
      map.set(item.author, item.likes)
    }
    return map
  }

  let blogsLikes = (blogs.reduce(calcLikes, new Map()))

  return biggestValue(blogsLikes)
}

const biggestValue = (blogs) => {
  let maxValue = 0
  let maxKey = ''
  blogs.forEach(function (value, key) {
    if (value > maxValue) {
      maxValue = value
      maxKey = key
    }
  })

  return { author: maxKey, blogs: maxValue }
}

module.exports = {
  dummy, totalLikes, mostBlogs, mostLikes
}