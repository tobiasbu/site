

export default function buildAt(eleventyConfig) {
  eleventyConfig.addGlobalData('tob.builtAt', () => {
    const timeZone =  "America/Sao_Paulo";

    const now = new Date();
    const time = new Intl.DateTimeFormat(
      'en-US', 
      { timeZone, dateStyle: 'full', timeStyle: 'long',  }
    );
    
    return { timeZone, isoString: now.toLocaleString('sv'), long: time.format(now), }
  });
}

