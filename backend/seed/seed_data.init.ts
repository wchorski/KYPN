// cred - http://facsfinalproject.weebly.com/6-categories-of-fruits.html

function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const locations_seeddata = []
export const pages_seeddata = []

export const events_seeddata = [
  {
    summary: 'Apple Harvest Festival',
    start: '2023-09-30T10:00:00.000Z',
    end: '2023-09-30T18:00:00.000Z',
    seats: 20,
    price: 100,
    description: 'Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!',
    photo: 'https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290294/cutefruit/product_images/clgu07ezt0000jssvguqp688x.jpg'
  },
  {
    summary: 'Berrylicious Smoothie Workshop',
    start: '2023-07-15T15:00:00.000Z',
    end: '2023-07-15T17:00:00.000Z',
    seats: 20,
    price: 100,
    description: 'Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!',
    photo: 'https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682290024/cutefruit/product_images/clgu01m7x0004dwsv0b05di5c.png'
  },
  {
    summary: 'Citrus Yoga Retreat',
    start: '2023-06-10T08:00:00.000Z',
    end: '2023-06-12T18:00:00.000Z',
    seats: 20,
    price: 100,
    description: 'Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!',
    photo: 'https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682288910/cutefruit/product_images/clgtzdr2o0000dwsv5pe0hjiv.jpg'
  },
  {
    summary: 'Tropical Fruit Tasting Tour',
    start: '2023-08-05T11:00:00.000Z',
    end: '2023-08-05T15:00:00.000Z',
    seats: 20,
    price: 100,
    description: 'Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!',
    photo: 'https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682275682/cutefruit/product_images/clgtri8ac00033ssve0n2do08.png'
  },
  {
    summary: 'Watermelon Summer Bash',
    start: '2023-07-01T16:00:00.000Z',
    end: '2023-07-01T20:00:00.000Z',
    seats: 20,
    price: 100,
    description: 'Join us for a day of fruity fun at the Berrylicious Summer Festival! Celebrate the vibrant flavors of berries with live music, games, and mouthwatering treats. Indulge in delicious strawberry shortcakes, blueberry pies, and raspberry lemonades. Enjoy berry-themed competitions, such as a pie-eating contest and a berry picking challenge. This family-friendly event guarantees a sweet and memorable experience for all berry enthusiasts!',
    photo: 'https://res.cloudinary.com/dh5vxixzn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1682274836/cutefruit/product_images/clgtr03ia0000gksv9qx8g9iz.jpg'
  }
]

export const user_seeddata = [
  {
    name: 'Adam',
    email: 'adam@m.lan',
    password: 'adam@m.lan',
    isAdmin: true,
  },
  {
    name: 'Eddy',
    email: 'eddy@m.lan',
    password: 'eddy@m.lan',
    isAdmin: false,
  },
  {
    name: 'Cinda',
    email: 'cinda@m.lan',
    password: 'cinda@m.lan',
    isAdmin: false,
  },
  {"name":"Ashien","password": "password", "email":"astoppard0@thetimes.co.uk"},
{"name":"Osbourne","password": "password", "email":"ochaudhry1@ameblo.jp"},
{"name":"Sileas","password": "password", "email":"sklos2@squarespace.com"},
{"name":"Ethelind","password": "password", "email":"ecutajar3@amazon.com"},
{"name":"Marc","password": "password", "email":"mpagen4@diigo.com"},
{"name":"Uriel","password": "password", "email":"uscreeton5@springer.com"},
{"name":"Leonie","password": "password", "email":"llynagh6@miitbeian.gov.cn"},
{"name":"Bronny","password": "password", "email":"bben7@ehow.com"},
{"name":"Audrye","password": "password", "email":"ashovlar8@wsj.com"},
{"name":"Gregory","password": "password", "email":"gdonnan9@auda.org.au"},
{"name":"Sibylla","password": "password", "email":"shandshearta@cbsnews.com"},
{"name":"Sher","password": "password", "email":"sfatharlyb@opensource.org"},
{"name":"Dido","password": "password", "email":"dechlinc@rediff.com"},
{"name":"Brewer","password": "password", "email":"boscanlond@symantec.com"},
{"name":"Carly","password": "password", "email":"cscaicee@aboutads.info"},
{"name":"Marsh","password": "password", "email":"mkikkef@ed.gov"},
{"name":"Osborne","password": "password", "email":"ofrontczakg@qq.com"},
{"name":"Sergeant","password": "password", "email":"ssieberth@latimes.com"},
{"name":"Madlin","password": "password", "email":"mvarfolomeevi@netscape.com"},
{"name":"Ceil","password": "password", "email":"cmacknockiterj@mayoclinic.com"},
{"name":"Connor","password": "password", "email":"clethbyk@twitter.com"},
{"name":"Dyann","password": "password", "email":"dtreendl@free.fr"},
{"name":"Kilian","password": "password", "email":"kgotherm@mtv.com"},
{"name":"Gustie","password": "password", "email":"gbudnikn@bravesites.com"},
{"name":"Keeley","password": "password", "email":"kstudholmeo@sfgate.com"},
{"name":"Nikolaus","password": "password", "email":"nmaccartairp@examiner.com"},
{"name":"Judah","password": "password", "email":"jfahyq@umich.edu"},
{"name":"Bartlet","password": "password", "email":"bguirardr@bizjournals.com"},
{"name":"Stefa","password": "password", "email":"sbrettels@telegraph.co.uk"},
{"name":"Shannan","password": "password", "email":"sdursleyt@tmall.com"},
{"name":"Gustav","password": "password", "email":"ggraberu@shareasale.com"},
{"name":"Ugo","password": "password", "email":"ubeddingv@barnesandnoble.com"},
{"name":"Morgan","password": "password", "email":"mluckcockw@cyberchimps.com"},
{"name":"Corinne","password": "password", "email":"cmaclavertyx@comcast.net"},
{"name":"Kerry","password": "password", "email":"klukery@oakley.com"},
{"name":"Alfi","password": "password", "email":"adahlgrenz@illinois.edu"},
{"name":"Ernestus","password": "password", "email":"ereames10@people.com.cn"},
{"name":"Anastasia","password": "password", "email":"adeabill11@fda.gov"},
{"name":"Adi","password": "password", "email":"alivingstone12@nyu.edu"},
{"name":"Ashla","password": "password", "email":"aoak13@bloglovin.com"},
{"name":"Far","password": "password", "email":"fffrench14@mozilla.org"},
{"name":"Barry","password": "password", "email":"bstreeten15@opensource.org"},
{"name":"Sandro","password": "password", "email":"sfibbens16@businessweek.com"},
{"name":"Danyette","password": "password", "email":"dvandenvelde17@blogger.com"},
{"name":"Orton","password": "password", "email":"okiddle18@zimbio.com"},
{"name":"Daryl","password": "password", "email":"dmacghee19@dailymotion.com"},
{"name":"Willy","password": "password", "email":"wphilbrick1a@indiatimes.com"},
{"name":"Efrem","password": "password", "email":"eheskin1b@shop-pro.jp"},
{"name":"Effie","password": "password", "email":"eklemensiewicz1c@ucsd.edu"},
{"name":"Marlowe","password": "password", "email":"mlewton1d@sun.com"},
{"name":"Stormi","password": "password", "email":"sperillo1e@examiner.com"},
{"name":"Rayna","password": "password", "email":"rtilley1f@techcrunch.com"},
{"name":"Arleta","password": "password", "email":"aphilips1g@nhs.uk"},
{"name":"Hasty","password": "password", "email":"hmichie1h@va.gov"},
{"name":"Monique","password": "password", "email":"mtreace1i@nsw.gov.au"},
{"name":"Godart","password": "password", "email":"ghorrell1j@ucoz.ru"},
{"name":"Gail","password": "password", "email":"gwantling1k@latimes.com"},
{"name":"Efren","password": "password", "email":"eenrich1l@ucoz.com"},
{"name":"Leelah","password": "password", "email":"lkleinsinger1m@odnoklassniki.ru"},
{"name":"Adriena","password": "password", "email":"adomerque1n@addthis.com"},
{"name":"Maryanna","password": "password", "email":"mdrysdell1o@adobe.com"},
{"name":"Blair","password": "password", "email":"bpatriche1p@reverbnation.com"},
{"name":"Durant","password": "password", "email":"dhaygreen1q@drupal.org"},
{"name":"Dael","password": "password", "email":"dgoozee1r@devhub.com"},
{"name":"Rockwell","password": "password", "email":"rhowett1s@japanpost.jp"},
{"name":"Viviene","password": "password", "email":"vbaxter1t@eepurl.com"},
{"name":"Valera","password": "password", "email":"vervine1u@usa.gov"},
{"name":"Raynard","password": "password", "email":"reakens1v@yahoo.co.jp"},
{"name":"Breena","password": "password", "email":"bsines1w@ning.com"},
{"name":"Fallon","password": "password", "email":"fspellessy1x@tripadvisor.com"},
{"name":"Annabal","password": "password", "email":"aboddam1y@issuu.com"},
{"name":"Udell","password": "password", "email":"ucrossfeld1z@dedecms.com"},
{"name":"Tove","password": "password", "email":"tgoucher20@rakuten.co.jp"},
{"name":"Lulu","password": "password", "email":"ltilsley21@ning.com"},
{"name":"Ali","password": "password", "email":"abartelsellis22@ed.gov"},
{"name":"Lezlie","password": "password", "email":"lbawcock23@odnoklassniki.ru"},
{"name":"Elizabet","password": "password", "email":"esweetmore24@multiply.com"},
{"name":"Winn","password": "password", "email":"wesmonde25@ca.gov"},
{"name":"Johann","password": "password", "email":"jcuseck26@edublogs.org"},
{"name":"Torin","password": "password", "email":"trastall27@imdb.com"},
{"name":"Vittorio","password": "password", "email":"vstedell28@bloomberg.com"},
{"name":"Delano","password": "password", "email":"dschiell29@ameblo.jp"},
{"name":"Akim","password": "password", "email":"alord2a@house.gov"},
{"name":"Amara","password": "password", "email":"awolton2b@icio.us"},
{"name":"Olag","password": "password", "email":"olobb2c@mozilla.org"},
{"name":"Ramona","password": "password", "email":"rsiegertsz2d@go.com"},
{"name":"Didi","password": "password", "email":"dpitway2e@w3.org"},
{"name":"Blondelle","password": "password", "email":"bsabban2f@1688.com"},
{"name":"Klemens","password": "password", "email":"ksommer2g@sohu.com"},
{"name":"Gunther","password": "password", "email":"gchatelet2h@kickstarter.com"},
{"name":"Grete","password": "password", "email":"ggatling2i@acquirethisname.com"},
{"name":"Granthem","password": "password", "email":"gklaggeman2j@tinypic.com"},
{"name":"Barbabas","password": "password", "email":"bnann2k@altervista.org"},
{"name":"Clementius","password": "password", "email":"crosenhaus2l@sfgate.com"},
{"name":"Isac","password": "password", "email":"isimkovitz2m@topsy.com"},
{"name":"Carolyne","password": "password", "email":"calcock2n@livejournal.com"},
{"name":"Cosimo","password": "password", "email":"cpead2o@redcross.org"},
{"name":"Lil","password": "password", "email":"lotto2p@msn.com"},
{"name":"Jorrie","password": "password", "email":"jbetjeman2q@patch.com"},
{"name":"Amabel","password": "password", "email":"afrancklyn2r@toplist.cz"},
{"name":"Desi","password": "password", "email":"dcovelle2s@prweb.com"},
{"name":"Farr","password": "password", "email":"fdimitru2t@fotki.com"},
{"name":"Brooks","password": "password", "email":"bhannam2u@thetimes.co.uk"},
{"name":"Adrian","password": "password", "email":"abritcher2v@addtoany.com"},
{"name":"Northrop","password": "password", "email":"nwinsiowiecki2w@behance.net"},
{"name":"Jarrid","password": "password", "email":"jmulvaney2x@wikia.com"},
{"name":"Helen","password": "password", "email":"hkindle2y@discovery.com"},
{"name":"Farrel","password": "password", "email":"frawcliffe2z@friendfeed.com"},
{"name":"Troy","password": "password", "email":"tfranca30@nasa.gov"},
{"name":"Hercules","password": "password", "email":"hsimmins31@uol.com.br"},
{"name":"Marna","password": "password", "email":"mhartridge32@cisco.com"},
{"name":"Jacinta","password": "password", "email":"jgiffkins33@discovery.com"},
{"name":"Cal","password": "password", "email":"cshimwell34@google.de"},
{"name":"Andrus","password": "password", "email":"asaunter35@japanpost.jp"},
{"name":"Eugenia","password": "password", "email":"ebelderson36@japanpost.jp"},
{"name":"Fin","password": "password", "email":"fhabble37@slideshare.net"},
{"name":"Trevor","password": "password", "email":"trowland38@livejournal.com"},
{"name":"Erin","password": "password", "email":"etant39@webs.com"},
{"name":"Ainsley","password": "password", "email":"avandalen3a@i2i.jp"},
{"name":"Moria","password": "password", "email":"mzorn3b@bbb.org"},
{"name":"Kendrick","password": "password", "email":"kreinard3c@irs.gov"},
{"name":"Niel","password": "password", "email":"ntytterton3d@sciencedaily.com"},
{"name":"Evvy","password": "password", "email":"ebertolin3e@cisco.com"},
{"name":"Egor","password": "password", "email":"egayther3f@aboutads.info"},
{"name":"Liam","password": "password", "email":"lseed3g@webmd.com"},
{"name":"Harold","password": "password", "email":"hwrighton3h@time.com"},
{"name":"Valerie","password": "password", "email":"vellett3i@goo.gl"},
{"name":"Ingeborg","password": "password", "email":"ibilbrey3j@sohu.com"},
{"name":"Tracie","password": "password", "email":"tfabbri3k@twitter.com"},
{"name":"Dayna","password": "password", "email":"ddalliwater3l@g.co"},
{"name":"Robinet","password": "password", "email":"rbattye3m@jiathis.com"},
{"name":"Brockie","password": "password", "email":"bsantello3n@cnet.com"},
{"name":"Read","password": "password", "email":"rsamworth3o@va.gov"},
{"name":"Cedric","password": "password", "email":"creason3p@virginia.edu"},
{"name":"Fleur","password": "password", "email":"flambarton3q@typepad.com"},
{"name":"Selie","password": "password", "email":"satterley3r@oakley.com"},
{"name":"Cecelia","password": "password", "email":"cspincke3s@biblegateway.com"},
{"name":"Cecelia","password": "password", "email":"csealeaf3t@ifeng.com"},
{"name":"John","password": "password", "email":"jellesworthe3u@mlb.com"},
{"name":"Kissie","password": "password", "email":"kgrindlay3v@topsy.com"},
{"name":"Clari","password": "password", "email":"cwillman3w@issuu.com"},
{"name":"Francyne","password": "password", "email":"flotterington3x@bluehost.com"},
{"name":"Babbette","password": "password", "email":"bfranck3y@comcast.net"},
{"name":"Caz","password": "password", "email":"csabatier3z@amazonaws.com"},
{"name":"Midge","password": "password", "email":"mpennington40@umn.edu"},
{"name":"Tanney","password": "password", "email":"tchallin41@altervista.org"},
{"name":"Nowell","password": "password", "email":"nricardet42@plala.or.jp"},
{"name":"Carlita","password": "password", "email":"cpane43@wufoo.com"},
{"name":"Zulema","password": "password", "email":"zeasum44@goodreads.com"},
{"name":"Gaspard","password": "password", "email":"glaunchbury45@redcross.org"},
{"name":"Deni","password": "password", "email":"dcrayton46@homestead.com"},
{"name":"Jeth","password": "password", "email":"jleborgne47@phoca.cz"},
{"name":"Muffin","password": "password", "email":"msparwell48@storify.com"},
{"name":"Anton","password": "password", "email":"abagniuk49@myspace.com"},
{"name":"Nero","password": "password", "email":"nmcwhinney4a@nsw.gov.au"},
{"name":"Davidde","password": "password", "email":"dlutwyche4b@csmonitor.com"},
{"name":"Alan","password": "password", "email":"adoveston4c@reference.com"},
{"name":"Deane","password": "password", "email":"ddannohl4d@cornell.edu"},
{"name":"Ronalda","password": "password", "email":"rcicculini4e@economist.com"},
{"name":"Maxy","password": "password", "email":"mbinks4f@nature.com"},
{"name":"Yvonne","password": "password", "email":"yvannuccinii4g@imdb.com"},
{"name":"Bevon","password": "password", "email":"btimbridge4h@cbsnews.com"},
{"name":"Justinn","password": "password", "email":"jjagger4i@sbwire.com"},
{"name":"Missy","password": "password", "email":"mkermott4j@china.com.cn"},
{"name":"Granthem","password": "password", "email":"ganan4k@sbwire.com"},
{"name":"Far","password": "password", "email":"fbernetti4l@lulu.com"},
{"name":"Hilda","password": "password", "email":"hhalse4m@zdnet.com"},
{"name":"Sonia","password": "password", "email":"smeeron4n@mapquest.com"},
{"name":"Gardie","password": "password", "email":"gpostlewhite4o@whitehouse.gov"},
{"name":"Donalt","password": "password", "email":"dpine4p@accuweather.com"},
{"name":"Vincenty","password": "password", "email":"vcleator4q@oakley.com"},
{"name":"Sylvester","password": "password", "email":"sluckcock4r@zdnet.com"},
{"name":"Jemie","password": "password", "email":"jrhymes4s@tuttocitta.it"},
{"name":"Diane-marie","password": "password", "email":"dpacke4t@ihg.com"},
{"name":"Ursuline","password": "password", "email":"ubudgett4u@tripod.com"},
{"name":"Bibbie","password": "password", "email":"bmickleburgh4v@cdc.gov"},
{"name":"Garek","password": "password", "email":"geskrigge4w@addtoany.com"},
{"name":"Fiann","password": "password", "email":"fbellward4x@exblog.jp"},
{"name":"Rey","password": "password", "email":"rfreke4y@so-net.ne.jp"},
{"name":"Essie","password": "password", "email":"ecurdell4z@illinois.edu"},
{"name":"Vernor","password": "password", "email":"vputtan50@people.com.cn"},
{"name":"Elliott","password": "password", "email":"ebruni51@bloglines.com"},
{"name":"Roarke","password": "password", "email":"rraun52@mediafire.com"},
{"name":"Blayne","password": "password", "email":"blangthorn53@youtu.be"},
{"name":"Alvera","password": "password", "email":"acowill54@marketwatch.com"},
{"name":"Arabel","password": "password", "email":"aexelby55@xinhuanet.com"},
{"name":"Fergus","password": "password", "email":"ffortman56@uol.com.br"},
{"name":"Shaw","password": "password", "email":"swoollends57@4shared.com"},
{"name":"Georgette","password": "password", "email":"gwildsmith58@netvibes.com"},
{"name":"Kathryn","password": "password", "email":"kelmhurst59@samsung.com"},
{"name":"Hamnet","password": "password", "email":"hbyham5a@aol.com"},
{"name":"Tymothy","password": "password", "email":"tstellino5b@skyrock.com"},
{"name":"Ashil","password": "password", "email":"acyples5c@businesswire.com"},
{"name":"Winny","password": "password", "email":"wwoodfine5d@macromedia.com"},
{"name":"Lonnie","password": "password", "email":"ltitherington5e@google.ru"},
{"name":"Whitby","password": "password", "email":"wkayne5f@dell.com"},
{"name":"Bat","password": "password", "email":"bmadgett5g@privacy.gov.au"},
{"name":"Jaquenette","password": "password", "email":"jradleigh5h@redcross.org"},
{"name":"Natalee","password": "password", "email":"nlote5i@apache.org"},
{"name":"Jeromy","password": "password", "email":"jmckimm5j@mediafire.com"},
]

export const roles_seedjson = [
  {
    name: 'admin',
    canManageProducts: true,
    canManageEvents: true,
    canManageTickets: true,
    canSeeOtherUsers: true,
    canManageUsers: true,
    canManageRoles: true,
    canManageCart: true,
    canManageOrders: true,
    assignedTo: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    name: 'editor',
    canManageProducts: true,
    canManageEvents: true,
    canSeeOtherUsers: true,
    canManageUsers: false,
    canManageRoles: false,
    canManageCart: true,
    canManageOrders: true,
    assignedTo: {
      connect: {
        email: 'eddy@m.lan'
      }
    }
  },
  {
    name: 'ticket taker',
    canManageTickets: true,
    assignedTo: {
      connect: {
        email: 'eddy@m.lan'
      }
    }
  },
  {
    name: 'client',
    canManageProducts: false,
    canSeeOtherUsers: false,
    canManageUsers: false,
    canManageRoles: false,
    canManageCart: false,
    canManageOrders: false,
    assignedTo: {
      connect: {
        email: 'cinda@m.lan'
      }
    }
  }
]

export const posts_seed = [
  {
    title: 'on3',
    slug: 'on3',
  },
  {
    title: '2wo',
    slug: '2wo',
  },
  {
    title: 'thre3',
    slug: 'thre3',
  },
]

export const categories_seedjson = [
  {
    name: 'Pomes',
    description: 'Fruits that have smooth skin and an enlarged fleshy area that surrounds the core. Examples of pomes are apples, pears, and kiwis.',
  },
  {
    name: 'Drupes',
    description: 'Fruits that contain a single seed, or pit, surrounded by juicy flesh. Examples of drupes are peaches, cherries, plums, nectarines, and apricots.',
  },
  {
    name: 'Berries',
    description: 'Fruits with a fragile cell structure, that are pulpy and juicy with tiny seeds embedded in the flesh. Examples of berries are blackberries, cranberries, strawberries, and grapes.',
  },
  {
    name: 'Melons',
    description: ': Fruits that have a hard outer surface that is either smooth or netted with a juicy flesh. Examples of melons include, cantaloupes, honeydew, watermelon, casaba, crenshaw, and muskmelon.',
  },
  {
    name: 'Citrus',
    description: ' Fruits that grow in warm regions, and have a firm rind and a pulpy flesh. Examples of citrus fruits are, oranges, grapefruits, tangerines, lemons, limes, kumquats, citrons, tengelows, and ugli fruit.',
  },
  {
    name: 'Tropical',
    description: 'Fruits that grow in very warm climates, and differ in skin composition and seed characteristics. Examples, of tropical fruits are bananas, pineapples, avocados, dates, figs, mangoes, pomegranates, and papayas.',
  },

]

export const tags_seedjson = [
  {
    name: 'blue'
  },
  {
    name: 'yellow'
  },
  {
    name: 'red'
  },
  {
    name: 'purple'
  },
  {
    name: 'white'
  },
  {
    name: 'black'
  },
  {
    name: 'green'
  },
  {
    name: 'stuffed'
  },
  {
    name: 'orange'
  },
  {
    name: 'two-eyes'
  },
  {
    name: 'one-eyed'
  },
  {
    name: 'ears'
  },
  {
    name: 'mouth'
  },
  {
    name: 'leaf'
  },
  {
    name: 'bundle'
  },
  {
    name: 'nose'
  },
]

export const products_seed = [
  {
    name: 'Banana Cherry',
    description: 'Fluffy and fruity',
    status: 'AVAILABLE',
    price: 3423,
    stockCount: 12,
    slug: 'banana-cherry',
    photo: {
      connect: {
        filename: 'cf-1.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'leaf' },
      ],
    }
  },
  {
    name: 'Penguin Pear',
    description: 'Cute and fruit',
    status: 'AVAILABLE',
    price: 1212,
    stockCount: 1,
    slug: 'penguin-pear',
    photo: {
      connect: {
        filename: 'cf-2.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'white' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'black' },
      ]
    }
  },
  {
    name: 'Sidways Pinapple',
    description: 'Wadda head turner',
    status: 'AVAILABLE',
    price: 54321,
    stockCount: 10,
    slug: 'sidways-pinapple',
    photo: {
      connect: {
        filename: 'cf-3.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'yellow' },
        { name: 'red' },
        { name: 'two-eyes' },
        { name: 'mouth' },
        { name: 'green' },
      ]
    },
  },
  {
    name: 'Tiger Tomatoe',
    description: 'Rawr',
    status: 'AVAILABLE',
    price: 3433,
    stockCount: 16,
    slug: 'tiger-tomatoe',
    photo: {
      connect: {
        filename: 'cf-4.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'mouth' },
        { name: 'nose' },
        { name: 'green' },
      ]
    },
  },
  {
    name: 'Scared Pear',
    description: 'yellow Green',
    status: 'AVAILABLE',
    price: 1111,
    stockCount: 3,
    slug: 'scared-pear',
    photo: {
      connect: {
        filename: 'cf-5.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'yellow' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
      ]
    },
  },
  {
    name: 'Strawberry Puff',
    description: 'super cutie',
    status: 'AVAILABLE',
    price: 454,
    stockCount: 956,
    slug: 'strawberry-puff',
    photo: {
      connect: {
        filename: 'cf-6.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'white' },
        { name: 'green' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
        { name: 'ears' },
        { name: 'red' },
        { name: 'leaf' },
      ]
    },
  },
  {
    name: 'Apple Pillow',
    description: 'an apple a day keeps the frowns away',
    status: 'AVAILABLE',
    price: 77,
    stockCount: 68,
    slug: 'apple-pillow',
    photo: {
      connect: {
        filename: 'cf-7.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'yellow' },
        { name: 'green' },
        { name: 'red' },
        { name: 'two-eyes' },
        { name: 'stuffed' },
        { name: 'mouth' },
        { name: 'leaf' },
      ]
    },
  },
  {
    name: 'Blue Drop',
    description: 'A little shy, but super friendly once it settles in',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'blue-drop',
    photo: {
      connect: {
        filename: 'cf-8.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'blue' },
        { name: 'yellow' },

        { name: 'stuffed' },

        { name: 'one-eyed' },

        { name: 'leaf' },

      ]
    },
  },
  {
    name: 'Azure Cyclops',
    description: 'The monster within is brought to life with every stick. This stuffed creature makes a big statement',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'azure-cyclops',
    photo: {
      connect: {
        filename: 'cf-9.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'blue' },
        { name: 'black' },
        { name: 'green' },
        { name: 'stuffed' },
        { name: 'one-eyed' },

        { name: 'mouth' },
        { name: 'leaf' },

      ]
    },
  },
  {
    name: 'Purple Fuzz Blob',
    description: "This extra fuzzy cutie sproutes a lil green leaf atop it's head",
    status: 'AVAILABLE',
    price: 590,
    stockCount: 81,
    slug: 'purple-blob',
    photo: {
      connect: {
        filename: 'cf-10.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'green' },
        { name: 'purple' },
        { name: 'stuffed' },
        { name: 'two-eyes' },
        { name: 'leaf' },
      ]
    },
  },
  {
    name: 'Inky Indigo',
    description: 'Wide eyed, 2 legged, cute and cuddly',
    status: 'AVAILABLE',
    price: 25657,
    stockCount: 999,
    slug: 'inky-indigo',
    photo: {
      connect: {
        filename: 'cf-11.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'purple' },

        { name: 'stuffed' },

        { name: 'two-eyes' },
      ]
    },
  },
  {
    name: 'Yellow Pearabol',
    description: 'Deliciously spooky, all around frighting',
    status: 'AVAILABLE',
    price: 237,
    stockCount: 8111,
    slug: 'yellow-pearabol',
    photo: {
      connect: {
        filename: 'cf-12.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [

        { name: 'yellow' },

        { name: 'green' },
        { name: 'stuffed' },

        { name: 'one-eyed' },

        { name: 'leaf' },

      ]
    },
  },
  {
    name: 'Kiwi Kidz',
    description: 'Rag tag team from down unda!',
    status: 'AVAILABLE',
    price: 27,
    stockCount: 8,
    slug: 'kiwi-kidz',
    photo: {
      connect: {
        filename: 'cf-13.png'
      }
    },
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [


        { name: 'green' },
        { name: 'stuffed' },

        { name: 'two-eyes' },


        { name: 'bundle' },
        { name: 'nose' },
      ]
    },
  },
  {
    name: 'Quad Kumquats',
    description: '4 of the most adorable citrus fruits',
    status: 'AVAILABLE',
    price: 2557,
    stockCount: 89,
    slug: 'quad-kumquats',
    photo: {
      connect: {
        filename: 'cf-14.png'
      }
    },

    author: {
      connect: {
        email: 'adam@m.lan'
      }
    },
    tags: {
      connect: [
        { name: 'purple' },
        { name: 'yellow' },
        { name: 'red' },

        { name: 'green' },
        { name: 'stuffed' },
        { name: 'orange' },


        { name: 'leaf' },
        { name: 'bundle' },

      ]
    },
  },

]

export const productImage_seedjson = [
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-1_vl6py2.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-1_vl6py2.png',
    // },
    altText: 'banana cherry photo',
    filename: 'cf-1.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-2_irpljj.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-2_irpljj.png',
    // },
    altText: 'penguine pear featured photo',
    filename: 'cf-2.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-3_jjjfad.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-3_jjjfad.png',
    // },
    altText: 'sideways pinapple featured photo',
    filename: 'cf-3.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-4_z3zuqd.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-4_z3zuqd.png',
    // },
    altText: 'tiger tomatoe photo',
    filename: 'cf-4.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-5_osljd5.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-5_osljd5.png',
    // },
    altText: 'scared pear photo',
    filename: 'cf-5.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-6_dct4dt.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-6_dct4dt.png',
    // },
    altText: 'strawberry puff featured photo',
    filename: 'cf-6.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-7_jhczgi.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118231/cutefruit/product_images/cf-7_jhczgi.png',
    // },
    altText: 'Apple Pillow featured photo',
    filename: 'cf-7.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-8_dqp2gy.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118232/cutefruit/product_images/cf-8_dqp2gy.png',
    // },
    altText: 'Blue Drop featured photo',
    filename: 'cf-8.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-9_mevrrl.png',
    // },
    altText: 'Azure Cyclops featured photo',
    filename: 'cf-9.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-10_c0juxo.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-10_c0juxo.png',
    // },
    altText: 'Purple Fuzz Blob featured photo',
    filename: 'cf-10.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-11_o8r6mg.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-11_o8r6mg.png',
    // },
    altText: 'Inky Indigo featured photo',
    filename: 'cf-11.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-12_if5w53.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-12_if5w53.png',
    // },
    altText: 'Yellow Pearabol featured photo',
    filename: 'cf-12.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-13_ah8qyb.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-13_ah8qyb.png',
    // },
    altText: 'Kiwi Kidz featured photo',
    filename: 'cf-13.png'
  },
  {
    // image: {
    //   publicUrl: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-14_f2xb2o.png',
    //   publicUrlTransformed: 'https://res.cloudinary.com/dh5vxixzn/image/upload/v1682118233/cutefruit/product_images/cf-14_f2xb2o.png',
    // },
    altText: 'Quad Kumquats featured photo',
    filename: 'cf-14.png'
  },
]

export const posts_seedjson = [
  {
    "title": "The Health Benefits of Berries",
    "slug": "health-benefits-berries",
    "dateCreated": "2023-05-01T10:00:00.000Z",
    dateModified: "2023-05-01T10:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 5,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Berries' }
      ]
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },
        { name: 'nose' },
        { name: 'leaf' },
      ],
    },
    "excerpt": "Learn about the amazing health benefits of various types of berries, including blueberries, strawberries, and raspberries."
  },
  {
    "title": "The World of Exotic Fruits",
    "slug": "exotic-fruits",
    "dateCreated": "2023-06-15T12:30:00.000Z",
    dateModified: "2023-06-15T12:30:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 1,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: true,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Berries' },
        { name: 'Citrus' },
      ]
    },
    tags: {
      connect: [
        { name: 'red' },
        { name: 'yellow' },
        { name: 'two-eyes' },

      ],
    },
    "excerpt": "Take a journey to discover some of the most unique and exotic fruits from around the world, including jackfruit, durian, and mangosteen."
  },
  {
    "title": "Fruit Smoothies: A Healthy and Delicious Option",
    "slug": "fruit-smoothies-healthy-delicious",
    "dateCreated": "2023-07-10T16:45:00.000Z",
    dateModified: "2023-07-10T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    categories: {
      connect: [
        { name: 'Tropical' },
        { name: 'Pomes' },
        { name: 'Drupes' },
        { name: 'Melons' },
      ]
    },
    tags: {
      connect: [

        { name: 'yellow' },
        { name: 'two-eyes' },

        { name: 'leaf' },
      ],
    },
    "excerpt": "Find out how to make nutritious and tasty fruit smoothies using a variety of fruits, such as bananas, strawberries, and kiwis."
  },
  {
    "title": "The Wonderful World of Apples",
    "slug": "wonderful-world-apples",
    "dateCreated": "2023-08-22T09:15:00.000Z",
    dateModified: "2023-08-22T09:15:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Explore the diverse world of apples, from sweet and crisp varieties like Honeycrisp and Pink Lady to tart and tangy options like Granny Smith and Braeburn."
  },
  {
    "title": "The Beauty of Fruit Art",
    "slug": "fruit-art",
    "dateCreated": "2023-09-30T14:00:00.000Z",
    dateModified: "2023-09-30T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Discover the creative and beautiful world of fruit art, from simple designs like watermelon baskets to intricate sculptures made from a variety of fruits."
  },
  {
    "title": "Fruity Suprise",
    "slug": "fruity-suprise",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2022-08-24T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    }
  },
  {
    "title": "Exploring the World of Exotic Fruits",
    "slug": "exploring-exotic-fruits",
    "dateCreated": "2022-08-24T14:00:00.000Z",
    dateModified: "2023-04-17T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Have you ever wondered what other fruits are out there beyond the ones you see at your local grocery store? There's a whole world of exotic fruits waiting to be discovered and tasted!",
  },
  {
    "title": "The Sweet and Sour World of Citrus Fruits",
    "slug": "sweet-sour-citrus-fruits",
    "dateCreated": "2023-04-17T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Discover the delicious and tangy world of citrus fruits, from lemons and limes to oranges and grapefruits.",
  },
  {
    "title": "Fruit and Cheese Pairings for a Perfect Charcuterie Board",
    "slug": "fruit-cheese-pairings-charcuterie-board",
    "dateCreated": "2024-02-28T14:00:00.000Z",
    dateModified: "2024-02-28T14:00:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Take your charcuterie board to the next level with these delicious fruit and cheese pairings, featuring combinations like figs and goat cheese and apples and cheddar."
  },
  {
    "title": "The Beauty and Benefits of Dragon Fruit",
    "slug": "dragon-fruit-beauty-benefits",
    "dateCreated": "2024-01-12T09:15:00.000Z",
    dateModified: "2024-01-12T09:15:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Discover the unique appearance and nutritional benefits of dragon fruit, also known as pitaya, and learn how to incorporate it into your diet."
  },
  {
    "title": "The World of Tropical Fruits",
    "slug": "tropical-fruits",
    "dateCreated": "2023-12-05T16:45:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Explore the amazing diversity of tropical fruits, including mangos, pineapples, and papayas, and learn about their health benefits and culinary uses."
  },
  {
    "title": "The Best Fruits for a Summer Picnic",
    "slug": "fruits-summer-picnic",
    "dateCreated": "2023-11-20T12:30:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Get ready for your next summer picnic with this guide to the best fruits to pack, including watermelon, cherries, and grapes."
  },
  {
    "title": "The Many Uses of Pomegranates",
    "slug": "uses-pomegranates",
    "dateCreated": "2023-10-15T10:00:00.000Z",
    dateModified: "2023-12-05T16:45:00.000Z",
    status: "PUBLISHED",
    template: "FULLWIDTH",
    pinned: 0,
    featured_image: 'https://cdn.dribbble.com/users/1326994/screenshots/6324315/e883_4x.jpg',
    featured_video: 'https://www.youtube.com/watch?v=wzGRs-C8kqs&t=561s',
    allow_comments: false,
    "author": {
      connect: {
        email: "adam@m.lan"
      }
    },
    "excerpt": "Discover the many culinary and medicinal uses of pomegranates, including how to juice them and use their seeds in recipes."
  }
]

export const subscriptions_seedjson = [
  {
    name: "The Fruit Fiesta",
    "slug": "fruit-fiesta",
    "description": "Join the party with a fully loaded fruit basket every month!",
    price: 30003,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    name: "The Double Trouble Fruity Bundle",
    "slug": "double-trouble-fruity-bundle",
    "description": "Twice the fruit, twice the fun! Receive a fully loaded fruit basket every two months.",
    price: 160002,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  },
  {
    name: "The Great Fruit Escape",
    "slug": "great-fruit-escape",
    "description": "Escape into the world of fresh fruit every three months with a fully loaded fruit basket!",
    price: 450009,
    "stockCount": 4,
    author: {
      connect: {
        email: 'adam@m.lan'
      }
    }
  }
]

export const services_seedjson = [
  {
    name: "Fruit Basket Service",
    price: 10000,
    durationInHours: "1.5",
    employees: {
      connect: [
        { email: "adam@m.lan" },
        { email: "eddy@m.lan" }
      ]
    }
  },
  {
    name: "Citrus Platter Service",
    price: 20000,
    durationInHours: "2.5",
    employees: {
      connect: [
        { email: "adam@m.lan" },
        { email: "eddy@m.lan" }
      ]
    }
  },
  {
    name: "Open Smoothie Bar",
    price: 30000,
    durationInHours: "4.5",
    buisnessDays: [0,5,6],
    employees: {
      connect: [
        { email: "adam@m.lan" },
        { email: "eddy@m.lan" }
      ]
    }
  },
  {
    name: "Cantaloupe Consultation",
    price: 30000,
    durationInHours: "4.5",
    buisnessHourOpen: '09:00:00',
    buisnessHourClosed: '18:00:00',
    buisnessDays: [1,2,3,4,5],
    employees: {
      connect: [
        { email: "adam@m.lan" },
        { email: "eddy@m.lan" }
      ]
    }
  },
]

export const addons_seedjson  = [
  {
    name: 'Scratch and Sniff Stickers',
    description: 'An assortment of scratch and stiff stickers with various fruity scents',
    price: 1,
    services: {
      connect: [
        { name: 'Fruit Basket Service'},
        { name: 'Citrus Platter Service'},
        { name: 'Open Smoothie Bar'},
      ]
    }
  },
  {
    name: 'Zester',
    description: 'Peel, scrape, shred to perfection.',
    price: 2,
    services: {
      connect: [
        { name: 'Fruit Basket Service'},
        { name: 'Citrus Platter Service'},
        { name: 'Open Smoothie Bar'},
      ]
    }
  },
  {
    name: 'Tomato Timer',
    description: 'Keep on schedual down the seconds and seeds.',
    price: 3,
    services: {
      connect: [
        { name: 'Fruit Basket Service'},
        { name: 'Citrus Platter Service'},
        { name: 'Open Smoothie Bar'},
      ]
    }
  },
]

export const avail_seedjson = [
  {
    start: '2023-12-01T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'adam@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
  {
    start: '2023-12-02T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'adam@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
  {
    start: '2023-12-03T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'adam@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
  {
    start: '2023-05-01T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'eddy@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
  {
    start: '2023-05-02T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'eddy@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
  {
    start: '2023-05-03T00:00:00+00:00',
    durationInHours: '23.9',
    employee: {
      connect: { email: 'eddy@m.lan'},   
    },
    type: 'VACATION',
    status: 'APPROVED',
  },
]