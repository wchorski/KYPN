"use client"
//? using over node v21 causes error
//TODO next needs 'use client' but idk if it's causing upgrade problems
import { buttonlink } from "./buttonlink"
import { callout } from "./callout"
import { card } from "./card"
import { carousel } from "./carousel"
import { contactform } from "./contactform"
import { hero } from "./hero"
import { iframe } from "./iframe"
import { image } from "./image"
import { imagegallery } from "./imagegallery"
import { imagelinklist } from "./imagelinklist"
import { infocard } from "./infocard"
import { infocardlist } from "./infocardlist"
import { mediatext } from "./mediatext"
import { postslist } from "./postslist"
import { quote } from "./quote"
import { section } from "./section"
import { sociallinknav } from "./sociallinknav"
import { table } from "./table"
import { videoLocal } from "./video-local"
import { youtubeVideo } from "./youtube-video"

// it's important that this file has a named export called componentBlocks
// schema.Post.ui.views import looks for a named export `componentBlocks`
export const componentBlocks = {
	callout,
	// slider,
	mediatext,
	section,
	postslist,
	image,
	infocard,
	infocardlist,
	imagelinklist,
	contactform,
	sociallinknav,
	iframe,
	hero,
	carousel,
	quote,
	// tweet,
	youtubeVideo,
	videoLocal,
	imagegallery,
	buttonlink,
	card,
	table,
}
