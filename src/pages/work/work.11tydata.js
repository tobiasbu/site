export default {
  layout: "base.njk",
	permalink: function ({ title, slug }) {
    return `/posts/${slug ?? this.slugify(title)}.html`;
  },
};