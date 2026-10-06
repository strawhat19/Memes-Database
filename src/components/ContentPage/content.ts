export type ContentPageName = `api` | `about` | `terms` | `privacy` | `contact`;

export const contentPages = {
  api: {
    eyebrow: `Inside the archive`,
    title: `The collection's API.`,
    introduction: `Memes Database uses a typed asynchronous service to manage your collection in this browser or device's local storage. This page describes that internal service; a public HTTP API and remote backend are not connected.`,
    sections: [
      { title: `Read and manage memes`, body: `getMemes reads the available collection, while getSnapshot includes its saved meme IDs. addMeme creates a local record, updateMeme edits one, and removeMeme deletes one. The starter memes are read-only; add your own version to edit it.` },
      { title: `Save your favorites`, body: `getSavedIds reads your bookmarks, toggleSaved saves or unsaves an available meme, and clearSaved removes all bookmarks. These changes stay on the browser or device you use.` },
      { title: `Check the service`, body: `getHealth reports storage availability, the storage mode, a timestamp, and success status. getRoutes lists the service operations, and getDirectory combines that list with the current health result. These are internal service methods; the listed API paths do not represent active HTTP endpoints.` },
    ],
  },
  about: {
    eyebrow: `A good laugh, well filed`,
    title: `A home for your kind of funny.`,
    introduction: `Memes-Database is a little archive for the oddly specific, instantly relatable moments that deserve another laugh.`,
    sections: [
      { title: `Browse. Bookmark. Make it yours.`, body: `Explore the starter collection, find a favorite, or add a meme of your own. Categories keep the archive easy to browse, and bookmarks make the keepers easy to find.` },
      { title: `Your own corner of the archive`, body: `Your added memes, bookmarks, and theme are kept on the browser or device you use. You can browse and build a private collection without creating an account.` },
      { title: `Original from the start`, body: `The starter collection uses original illustrated examples. The archive-card logo and its joyful grin were created for Memes-Database, with a little green accent on the M.` },
    ],
  },
  terms: {
    eyebrow: `A few ground rules`,
    title: `Keep the laughs kind.`,
    introduction: `Use Memes-Database for a personal collection of memes and images you are allowed to use.`,
    sections: [
      { title: `Your content`, body: `Only add content you own, have permission to use, or may lawfully use. Respect copyright, people's privacy, and other people's dignity. You remain responsible for the material you choose to add or share elsewhere.` },
      { title: `A personal collection`, body: `This version keeps additions and bookmarks on your device. It does not publish your uploads to a public feed, provide an account, or sync a collection across devices.` },
      { title: `Keep your originals`, body: `Browser storage can fill up or be cleared. Changes to your browser, app, or device can remove saved data. Keep a separate copy of important images; this archive is not a backup service.` },
      { title: `Linked images`, body: `Images loaded from an external HTTPS link depend on that website. They can change, become unavailable, or be subject to that site's terms. Use a trusted source and avoid sensitive image links.` },
    ],
  },
  privacy: {
    eyebrow: `Your collection, close to home`,
    title: `A private little archive.`,
    introduction: `The memes you add and the ones you save stay in this browser or device's local storage. There is no account or collection-sync service in this version.`,
    sections: [
      { title: `What stays on your device`, body: `The app stores your added meme titles, captions, categories, image data or image links, bookmarks, and theme preference locally. Uploaded image files are stored with the collection; the app does not upload them to a meme server.` },
      { title: `What an image link does`, body: `When you add an HTTPS image link, your browser requests that image from its host. That host may receive your IP address and ordinary request information. Its privacy practices apply to that request. Upload an image file if you prefer to keep the image data local.` },
      { title: `Removing your data`, body: `Delete an added meme from its detail page or clear saved bookmarks from Saved. Clearing this site's browser storage or app data removes the local collection and preferences. It also removes your ability to recover them here.` },
      { title: `Shared devices and external links`, body: `Someone using the same browser profile may be able to view your collection. Links to Piratechs leave this app and are covered by the destination site's policies.` },
    ],
  },
  contact: {
    eyebrow: `Say hello`,
    title: `A good idea? We're listening.`,
    introduction: `For questions, feedback, or suggestions about Memes-Database, visit Piratechs and use its available contact options.`,
    sections: [
      { title: `Help us understand the moment`, body: `When reporting a problem, mention what you were doing, your browser or device, and the message you saw. Avoid sending private image links or anything sensitive from your collection.` },
      { title: `Your memes stay yours`, body: `A contact message does not transfer your local collection. You choose which details to share when asking for help.` },
    ],
  },
};
