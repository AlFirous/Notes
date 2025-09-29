module.exports = function(eleventyConfig) {
  // Copy CSS to output
  eleventyConfig.addPassthroughCopy("css");
  
  // Date filter for posts
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Automatically set layout and tags for all posts
  eleventyConfig.addGlobalData("layout", "post.njk");
  
  // Use "Creation date" field from your frontmatter as the date
  eleventyConfig.addGlobalData("eleventyComputed", {
    date: data => {
      // Use "Creation date" if available, otherwise use file creation date
      return data["Creation date"] ? new Date(data["Creation date"]) : data.page.date;
    },
    tags: data => {
      // Automatically tag all markdown files in posts folder as "post"
      if (data.page.inputPath.includes('/posts/')) {
        return ["post"];
      }
      return [];
    }
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};