/* =========================================================
   Data 35 tokoh Alkitab
   - emoji   : teka-teki (tiap emoji dipisah spasi)
   - test    : "PL" (Perjanjian Lama) atau "PB" (Perjanjian Baru)
   - level   : "mudah" | "sedang" | "sulit"
   - ref     : referensi ayat (acuan Alkitab TB LAI)
   - inti    : ringkasan satu kalimat
   - kisah   : ringkasan kisah dalam kata-kata sendiri
   - pesan   : "Apa yang bisa kita pelajari?"
   - petunjuk: dipakai saat pemain memakai bantuan
   ========================================================= */
const TOKOH = [
  /* ---------------- PERJANJIAN LAMA ---------------- */
  {
    id: "adam-hawa", nama: "Adam & Hawa", emoji: "🌳 🍎 🐍", test: "PL", level: "mudah",
    ref: "Kejadian 2–3",
    inti: "Manusia pertama yang hidup di Taman Eden dan jatuh ke dalam dosa.",
    kisah: [
      "Allah menciptakan Adam dan Hawa dan menempatkan mereka di Taman Eden, tempat segalanya serba cukup. Mereka hanya diminta satu hal: tidak memakan buah dari pohon pengetahuan tentang yang baik dan yang jahat.",
      "Seekor ular membujuk Hawa sampai ia memakan buah itu dan memberikannya kepada Adam. Seketika mereka sadar telah melanggar perintah dan bersembunyi dari hadapan Allah.",
      "Akibatnya mereka diusir dari taman. Walau begitu, Allah tetap memelihara mereka dan menyiapkan janji pemulihan."
    ],
    pesan: "Dosa selalu dimulai dari keraguan akan firman Allah, tetapi kasih Allah tetap mencari manusia yang jatuh.",
    petunjuk: "Aku dan pasanganku adalah manusia pertama."
  },
  {
    id: "nuh", nama: "Nuh", emoji: "🚢 🐘 🌈", test: "PL", level: "mudah",
    ref: "Kejadian 6–9",
    inti: "Pria benar yang membangun bahtera sebelum air bah datang.",
    kisah: [
      "Ketika kejahatan manusia merajalela, Nuh tetap hidup benar di hadapan Allah. Ia diperintahkan membuat bahtera yang sangat besar dan membawa keluarganya serta berpasang-pasang hewan masuk ke dalamnya.",
      "Air bah menutupi bumi selama berbulan-bulan, tetapi seisi bahtera selamat. Setelah air surut, Nuh keluar dan mempersembahkan korban syukur.",
      "Allah berjanji tidak akan membinasakan bumi dengan air bah lagi dan menjadikan pelangi sebagai tanda perjanjian-Nya."
    ],
    pesan: "Taat pada perintah Allah mungkin terlihat aneh bagi orang lain, tetapi ketaatan itulah yang menyelamatkan.",
    petunjuk: "Aku membangun kapal raksasa di daratan kering."
  },
  {
    id: "musa", nama: "Musa", emoji: "🔥 🌿 🌊 ⛰️", test: "PL", level: "mudah",
    ref: "Keluaran 3; 14; 20",
    inti: "Pemimpin yang membawa bangsa Israel keluar dari perbudakan Mesir.",
    kisah: [
      "Musa dipanggil Allah dari semak yang menyala namun tidak terbakar untuk membebaskan bangsa Israel dari perbudakan di Mesir. Awalnya ia merasa tidak mampu, tetapi Allah menyertainya.",
      "Setelah sepuluh tulah menimpa Mesir, bangsa Israel keluar dan Allah membelah Laut Merah supaya mereka bisa menyeberang di tanah kering.",
      "Di Gunung Sinai, Musa menerima Sepuluh Hukum, lalu memimpin umat itu melewati padang gurun menuju tanah perjanjian."
    ],
    pesan: "Allah tidak mencari orang yang merasa hebat, melainkan orang yang bersedia diutus dan diperlengkapi-Nya.",
    petunjuk: "Aku dipanggil dari semak yang menyala."
  },
  {
    id: "daud", nama: "Daud", emoji: "🧒 🎯 👹 🎶", test: "PL", level: "mudah",
    ref: "1 Samuel 16–17",
    inti: "Gembala muda yang mengalahkan raksasa Goliat dan kelak menjadi raja.",
    kisah: [
      "Daud adalah anak bungsu yang bekerja sebagai gembala dan pandai bermain kecapi. Samuel mengurapinya secara diam-diam sebagai calon raja Israel.",
      "Ketika seluruh pasukan Israel gentar menghadapi raksasa Filistin bernama Goliat, Daud maju hanya dengan umban dan lima batu licin, percaya bahwa Allah yang menyertainya.",
      "Satu lemparan batu menjatuhkan Goliat. Daud kemudian menjadi raja terbesar Israel, meski ia juga pernah jatuh dan bertobat."
    ],
    pesan: "Kekuatan sejati bukan dari ukuran atau senjata, melainkan dari iman kepada Allah.",
    petunjuk: "Aku seorang gembala yang berani melawan raksasa."
  },
  {
    id: "daniel", nama: "Daniel", emoji: "🦁 🕳️ 🙏", test: "PL", level: "mudah",
    ref: "Daniel 6",
    inti: "Pejabat setia yang diselamatkan Allah dari gua singa.",
    kisah: [
      "Daniel melayani di pemerintahan Babel dan Persia dengan jujur sehingga raja sangat mempercayainya. Hal ini membuat pejabat lain iri dan menyusun jebakan.",
      "Mereka membujuk raja membuat larangan berdoa kepada selain raja. Daniel tetap berdoa tiga kali sehari kepada Allahnya seperti biasa.",
      "Ia dilemparkan ke gua singa, tetapi Allah mengirim malaikat-Nya menutup mulut singa-singa itu. Daniel keluar tanpa luka."
    ],
    pesan: "Konsisten setia kepada Allah, bahkan ketika risikonya besar, tidak pernah sia-sia.",
    petunjuk: "Aku tetap berdoa meski dilarang, lalu dilempar ke kandang binatang buas."
  },
  {
    id: "yunus", nama: "Yunus", emoji: "🐋 ⛈️ 🛶", test: "PL", level: "mudah",
    ref: "Yunus 1–4",
    inti: "Nabi yang melarikan diri dari tugas dan ditelan ikan besar.",
    kisah: [
      "Allah menyuruh Yunus pergi ke Niniwe untuk memperingatkan penduduknya. Yunus justru naik kapal ke arah yang berlawanan.",
      "Badai besar menimpa kapal itu. Yunus meminta dilemparkan ke laut, lalu ia ditelan seekor ikan besar dan berdoa dari dalam perutnya selama tiga hari.",
      "Setelah dimuntahkan, ia menaati perintah Allah. Orang Niniwe bertobat dan Allah mengampuni mereka, walau Yunus sempat kesal dengan kemurahan itu."
    ],
    pesan: "Kita tidak bisa lari dari panggilan Allah, dan kasih karunia-Nya terbuka bagi siapa saja.",
    petunjuk: "Aku lari dari tugas dan menginap di dalam perut makhluk laut."
  },
  {
    id: "kain-habel", nama: "Kain & Habel", emoji: "🌽 🐑 😠", test: "PL", level: "sedang",
    ref: "Kejadian 4:1–16",
    inti: "Dua kakak beradik anak Adam; yang satu membunuh yang lain.",
    kisah: [
      "Kain adalah petani dan Habel adalah gembala. Keduanya membawa persembahan kepada Allah, tetapi Allah berkenan pada persembahan Habel.",
      "Kain menjadi iri dan marah. Meski Allah sudah menasihatinya untuk menguasai diri, Kain mengajak adiknya ke padang dan membunuhnya.",
      "Allah menegur Kain dan ia harus mengembara sebagai buronan. Kisah ini adalah pembunuhan pertama dalam Alkitab."
    ],
    pesan: "Iri hati yang dibiarkan bisa berubah menjadi tindakan yang merusak orang lain dan diri sendiri.",
    petunjuk: "Kami bersaudara, anak dari manusia pertama."
  },
  {
    id: "abraham", nama: "Abraham", emoji: "🌟 👴 🐏", test: "PL", level: "sedang",
    ref: "Kejadian 12; 15; 22",
    inti: "Bapa orang beriman yang dijanjikan keturunan sebanyak bintang.",
    kisah: [
      "Allah memanggil Abraham meninggalkan negerinya menuju tempat yang belum ia ketahui, disertai janji menjadikannya bangsa yang besar. Ia berangkat tanpa tahu tujuan akhirnya.",
      "Meski sudah tua dan istrinya Sara mandul, Abraham percaya pada janji Allah. Lalu lahirlah Ishak.",
      "Kemudian imannya diuji ketika Allah memintanya mempersembahkan Ishak. Pada saat terakhir Allah menahan tangannya dan menyediakan seekor domba sebagai gantinya."
    ],
    pesan: "Iman berarti percaya pada janji Allah bahkan ketika jalannya belum terlihat.",
    petunjuk: "Aku disebut bapa orang beriman dan dijanjikan keturunan sebanyak bintang di langit."
  },
  {
    id: "yakub", nama: "Yakub", emoji: "🥣 😴 🤼", test: "PL", level: "sedang",
    ref: "Kejadian 28; 32",
    inti: "Pria yang bermimpi tangga ke surga dan kemudian diberi nama Israel.",
    kisah: [
      "Yakub adalah anak Ishak dan kembaran Esau. Ia lari dari rumah setelah menipu kakaknya demi hak kesulungan.",
      "Dalam pelariannya, ia tidur beralaskan batu dan bermimpi melihat tangga dari bumi ke surga dengan malaikat naik turun. Allah memperbarui janji-Nya kepadanya.",
      "Bertahun-tahun kemudian, Yakub bergumul dengan seorang utusan Allah di tepi sungai dan menerima nama baru, Israel. Dari anak-anaknya lahirlah dua belas suku Israel."
    ],
    pesan: "Allah tetap menyertai kita meski kita jatuh, dan Ia sanggup mengubah karakter orang yang bergumul dengan-Nya.",
    petunjuk: "Namaku kemudian diganti menjadi Israel."
  },
  {
    id: "yusuf", nama: "Yusuf", emoji: "🧥 🔗 🐪", test: "PL", level: "sedang",
    ref: "Kejadian 37; 39–45",
    inti: "Anak kesayangan yang dijual saudaranya lalu menjadi penguasa Mesir.",
    kisah: [
      "Yusuf dikasihi ayahnya, Yakub, dan diberi jubah istimewa. Saudara-saudaranya cemburu, memasukkannya ke dalam sumur, lalu menjualnya sebagai budak ke Mesir.",
      "Di Mesir ia difitnah dan dipenjara, tetapi tetap setia. Karena dapat menafsirkan mimpi Firaun tentang tujuh tahun kelimpahan dan tujuh tahun kelaparan, ia diangkat menjadi penguasa kedua setelah Firaun.",
      "Saat kelaparan datang, saudara-saudaranya datang meminta gandum. Yusuf mengampuni mereka dan berkata bahwa apa yang mereka rancang jahat, Allah mengubahnya menjadi baik."
    ],
    pesan: "Allah bisa memakai kepahitan dan ketidakadilan untuk tujuan yang baik, dan pengampunan memulihkan hubungan.",
    petunjuk: "Aku dijual saudara sendiri tetapi kelak menyelamatkan mereka dari kelaparan."
  },
  {
    id: "yosua", nama: "Yosua", emoji: "🎺 🧱 🏙️", test: "PL", level: "sedang",
    ref: "Yosua 1; 6",
    inti: "Pengganti Musa yang memimpin Israel merebut Yerikho.",
    kisah: [
      "Setelah Musa wafat, Yosua dipilih untuk memimpin bangsa Israel memasuki tanah Kanaan. Allah memerintahkannya untuk kuat dan berani.",
      "Kota Yerikho dikelilingi tembok tinggi. Allah memberi strategi yang tidak lazim: berjalan mengelilingi kota selama enam hari, dan pada hari ketujuh mengelilinginya tujuh kali sambil meniup sangkakala.",
      "Ketika bangsa itu bersorak, tembok kota runtuh dan Israel dapat masuk."
    ],
    pesan: "Mengikuti cara Allah, meski tampak tidak masuk akal, membawa kemenangan yang tidak bisa kita buat sendiri.",
    petunjuk: "Aku memimpin umat setelah Musa dan temboknya runtuh karena tiupan sangkakala."
  },
  {
    id: "simson", nama: "Simson", emoji: "💇‍♂️ 💪 ✂️", test: "PL", level: "sedang",
    ref: "Hakim-hakim 13–16",
    inti: "Hakim bertenaga luar biasa yang rahasianya ada pada rambutnya.",
    kisah: [
      "Simson adalah orang Nazir yang dikaruniai kekuatan luar biasa, bahkan sanggup mengalahkan singa dengan tangan kosong. Ia dipakai Allah untuk menghadapi bangsa Filistin.",
      "Namun ia lemah terhadap godaan. Delila membujuknya sampai ia membuka rahasia bahwa kekuatannya terletak pada rambutnya yang tidak pernah dicukur.",
      "Simson ditangkap, matanya dibutakan dan ia dijadikan tontonan. Dalam doa terakhirnya, Allah memulihkan kekuatannya dan ia meruntuhkan bangunan besar tempat musuhnya berkumpul."
    ],
    pesan: "Karunia besar tanpa kendali diri bisa menjatuhkan, tetapi Allah tetap memberi kesempatan kembali kepada orang yang berseru kepada-Nya.",
    petunjuk: "Kekuatanku hilang ketika rambutku dipotong."
  },
  {
    id: "samuel", nama: "Samuel", emoji: "👦 🌙 👂", test: "PL", level: "sedang",
    ref: "1 Samuel 1; 3",
    inti: "Anak kecil yang mendengar panggilan Allah di malam hari.",
    kisah: [
      "Samuel lahir dari doa Hana yang lama mendambakan anak. Sebagai ucapan syukur, Hana menyerahkan Samuel untuk melayani Allah di bait suci bersama imam Eli.",
      "Suatu malam Samuel mendengar namanya dipanggil. Ia mengira Eli yang memanggil, sampai Eli menyadari bahwa itu suara Allah.",
      "Sejak itu Samuel tumbuh menjadi nabi yang dipercaya, bahkan kemudian mengurapi Saul dan Daud sebagai raja."
    ],
    pesan: "Allah bisa berbicara kepada siapa saja, termasuk yang masih muda, selama ada hati yang mau mendengar.",
    petunjuk: "Aku dipanggil Allah ketika masih kecil, saat sedang tidur di bait suci."
  },
  {
    id: "salomo", nama: "Salomo", emoji: "⚖️ 🏛️ 👑", test: "PL", level: "sedang",
    ref: "1 Raja-raja 3; 6",
    inti: "Raja yang meminta hikmat dan membangun Bait Suci.",
    kisah: [
      "Setelah menjadi raja menggantikan Daud, Salomo diberi kesempatan meminta apa saja kepada Allah. Ia tidak meminta kekayaan atau umur panjang, melainkan hati yang berhikmat untuk memimpin.",
      "Hikmatnya terlihat ketika dua ibu memperebutkan seorang bayi. Ia memerintahkan bayi itu dibelah dua, dan dari reaksi kedua ibu itu ia tahu siapa ibu yang sebenarnya.",
      "Ia juga membangun Bait Suci di Yerusalem. Namun di akhir hidupnya, hatinya menyimpang karena pengaruh istri-istrinya."
    ],
    pesan: "Hikmat lebih berharga daripada kekayaan, tetapi hikmat perlu dijaga sampai akhir.",
    petunjuk: "Aku meminta hikmat dan memutuskan perkara dua ibu yang memperebutkan seorang bayi."
  },
  {
    id: "ester", nama: "Ester", emoji: "👸 🍽️ 📜", test: "PL", level: "sedang",
    ref: "Ester 4–7",
    inti: "Ratu Persia yang berani menyelamatkan bangsanya.",
    kisah: [
      "Ester, seorang gadis Yahudi, diangkat menjadi ratu Persia tanpa seorang pun tahu asal-usulnya. Pejabat licik bernama Haman merancang pembantaian seluruh orang Yahudi.",
      "Mordekhai, saudara sepupunya, meminta Ester menghadap raja meski menghadap tanpa dipanggil bisa berarti hukuman mati. Ester meminta bangsanya berpuasa, lalu berkata bahwa jika ia harus binasa, biarlah ia binasa.",
      "Lewat jamuan makan, Ester membongkar rencana Haman. Bangsanya selamat dan Haman menerima ganjaran perbuatannya sendiri."
    ],
    pesan: "Posisi dan kesempatan yang kita miliki bisa jadi dipakai Allah untuk menolong banyak orang.",
    petunjuk: "Aku menjadi ratu dan mengundang raja ke perjamuan demi menyelamatkan bangsaku."
  },
  {
    id: "ayub", nama: "Ayub", emoji: "😢 🏚️ 🤒", test: "PL", level: "sedang",
    ref: "Ayub 1–2; 42",
    inti: "Orang saleh yang kehilangan segalanya tetapi tetap berpegang pada Allah.",
    kisah: [
      "Ayub adalah orang yang saleh dan sangat kaya. Dalam waktu singkat ia kehilangan ternak, harta, anak-anaknya, dan kesehatannya.",
      "Teman-temannya datang dan menyimpulkan bahwa penderitaannya adalah hukuman atas dosa. Ayub tidak setuju dan bergumul jujur dengan Allah dalam pertanyaan dan keluhannya.",
      "Akhirnya Allah menjawab dan Ayub semakin mengenal-Nya. Allah memulihkan keadaannya dua kali lipat."
    ],
    pesan: "Penderitaan tidak selalu akibat dosa, dan kita boleh jujur kepada Allah dalam pergumulan kita.",
    petunjuk: "Aku kehilangan harta dan keluarga namun tetap bertahan dalam iman."
  },
  {
    id: "rut", nama: "Rut", emoji: "🌾 👩 👵", test: "PL", level: "sulit",
    ref: "Rut 1–4",
    inti: "Menantu perempuan yang setia pada mertuanya dan mengumpulkan gandum.",
    kisah: [
      "Rut berasal dari Moab. Setelah suaminya meninggal, mertuanya Naomi memutuskan kembali ke Betlehem dan menyuruh menantunya pulang ke keluarga masing-masing. Rut memilih ikut dan berkata bahwa bangsa Naomi akan menjadi bangsanya.",
      "Di Betlehem, Rut memungut sisa gandum di ladang Boas untuk menghidupi mereka berdua. Boas, kerabat Naomi, memperhatikan kebaikan hatinya.",
      "Boas menebus mereka dan menikahi Rut. Dari keturunan mereka lahir Daud, leluhur Yesus."
    ],
    pesan: "Kesetiaan dan kerja keras yang sederhana bisa menjadi bagian dari rencana besar Allah.",
    petunjuk: "Aku seorang perempuan asing yang setia kepada mertuaku."
  },
  {
    id: "elia", nama: "Elia", emoji: "🐦 🌧️ 🐂", test: "PL", level: "sulit",
    ref: "1 Raja-raja 17–19",
    inti: "Nabi yang api dari langit menjawab doanya di Gunung Karmel.",
    kisah: [
      "Di masa Raja Ahab, bangsa Israel menyembah Baal. Elia menyampaikan bahwa hujan tidak akan turun, dan terjadilah kekeringan panjang. Dalam masa itu Allah memelihara Elia dengan burung gagak yang membawa roti.",
      "Di Gunung Karmel, Elia menantang para nabi Baal. Mereka berseru berjam-jam tanpa hasil, sementara saat Elia berdoa, api dari Tuhan menyambar korbannya.",
      "Setelah itu hujan turun kembali. Elia sempat putus asa dan lari, tetapi Allah menguatkannya dengan suara yang lembut."
    ],
    pesan: "Allah mendengar dan menjawab, dan Ia juga menguatkan hamba-Nya yang lelah.",
    petunjuk: "Aku mengadakan adu doa dengan nabi-nabi Baal dan diberi makan oleh burung."
  },
  {
    id: "gideon", nama: "Gideon", emoji: "🏺 🔦 ⚔️", test: "PL", level: "sulit",
    ref: "Hakim-hakim 6–7",
    inti: "Hakim yang memenangkan perang hanya dengan 300 orang.",
    kisah: [
      "Gideon awalnya menganggap dirinya orang kecil dari keluarga yang lemah. Namun malaikat Tuhan menyebutnya pahlawan gagah berani dan mengutusnya melawan bangsa Midian.",
      "Ia meminta tanda dengan bulu domba: sekali bulu itu basah sementara tanah kering, lalu sebaliknya. Allah memberi kedua tanda itu.",
      "Pasukannya dikurangi sampai tinggal 300 orang yang bersenjatakan sangkakala dan buyung berisi obor. Saat mereka meniup dan memecahkan buyung di malam hari, musuh kacau dan lari."
    ],
    pesan: "Allah sering memakai yang sedikit dan lemah supaya kemuliaan itu jelas milik-Nya.",
    petunjuk: "Aku meminta tanda lewat bulu domba, lalu pasukanku dikurangi menjadi 300 orang."
  },
  {
    id: "debora", nama: "Debora", emoji: "🌴 👩‍⚖️ 🥁", test: "PL", level: "sulit",
    ref: "Hakim-hakim 4–5",
    inti: "Hakim perempuan yang memimpin Israel di bawah pohon korma.",
    kisah: [
      "Debora adalah nabiah sekaligus hakim yang memutuskan perkara umat sambil duduk di bawah sebuah pohon korma. Orang Israel datang kepadanya untuk meminta keadilan.",
      "Saat bangsa Kanaan menindas mereka, Debora memanggil Barak untuk memimpin pasukan. Barak mau berangkat hanya jika Debora ikut, dan Debora setuju.",
      "Allah memberi kemenangan kepada Israel, dan Debora menyanyikan lagu syukur bersama Barak."
    ],
    pesan: "Allah memakai siapa saja yang bersedia dipimpin-Nya, tanpa memandang latar belakang.",
    petunjuk: "Aku seorang hakim perempuan, dan Barak bersamaku di medan perang."
  },
  {
    id: "nehemia", nama: "Nehemia", emoji: "🍷 🔨 🏗️", test: "PL", level: "sulit",
    ref: "Nehemia 2–6",
    inti: "Juru minuman raja yang memimpin pembangunan kembali tembok Yerusalem.",
    kisah: [
      "Nehemia bekerja sebagai juru minuman Raja Artahsasta. Ia sedih mendengar tembok Yerusalem masih runtuh dan berdoa sebelum meminta izin raja untuk pulang membangunnya.",
      "Ketika tiba, ia memeriksa kerusakan dan mengajak penduduk membangun bersama. Mereka dibagi per kelompok dan mengerjakan bagian dekat rumah mereka.",
      "Meski diejek dan diancam musuh, mereka bekerja sambil berjaga. Tembok selesai hanya dalam 52 hari."
    ],
    pesan: "Pekerjaan besar selesai ketika doa, rencana, dan kerja sama berjalan bersama.",
    petunjuk: "Aku seorang juru minuman raja yang kemudian membangun tembok kota."
  },

  /* ---------------- PERJANJIAN BARU ---------------- */
  {
    id: "maria", nama: "Maria (ibu Yesus)", emoji: "👼 🤰 👶", test: "PB", level: "mudah",
    ref: "Lukas 1–2",
    inti: "Perempuan muda yang dipilih menjadi ibu Yesus.",
    kisah: [
      "Malaikat Gabriel mendatangi Maria di Nazaret dan menyampaikan bahwa ia akan mengandung dan melahirkan seorang Anak yang diberi nama Yesus. Maria bertunangan dengan Yusuf.",
      "Maria menjawab bahwa ia adalah hamba Tuhan, biarlah terjadi padanya sesuai perkataan itu. Ia lalu menyanyikan pujian yang dikenal sebagai Magnificat.",
      "Yesus lahir di Betlehem dan dibaringkan di palungan. Maria menyimpan semua peristiwa itu dalam hatinya."
    ],
    pesan: "Taat dan rela dipakai Allah, walau tidak sepenuhnya paham, adalah wujud iman yang sungguh.",
    petunjuk: "Malaikat Gabriel datang memberitahuku tentang seorang Anak."
  },
  {
    id: "yohanes-pembaptis", nama: "Yohanes Pembaptis", emoji: "🦗 🍯 💧", test: "PB", level: "sedang",
    ref: "Matius 3",
    inti: "Pembuka jalan bagi Yesus yang membaptis di Sungai Yordan.",
    kisah: [
      "Yohanes hidup di padang gurun, berpakaian bulu unta, dan makan belalang serta madu hutan. Ia menyerukan orang untuk bertobat karena Kerajaan Surga sudah dekat.",
      "Banyak orang datang kepadanya untuk dibaptis di Sungai Yordan sebagai tanda pertobatan.",
      "Suatu hari Yesus datang meminta dibaptis. Yohanes sempat merasa tidak layak, namun menurutinya, dan Allah menyatakan perkenanan-Nya kepada Yesus."
    ],
    pesan: "Tugas kita sering kali bukan menjadi pusat perhatian, melainkan mengarahkan orang kepada Kristus.",
    petunjuk: "Aku makan belalang dan membaptis Yesus."
  },
  {
    id: "petrus", nama: "Petrus", emoji: "🎣 🐓 🔑", test: "PB", level: "sedang",
    ref: "Matius 26:69–75; Yohanes 21",
    inti: "Nelayan murid Yesus yang menyangkal-Nya tiga kali lalu dipulihkan.",
    kisah: [
      "Petrus adalah nelayan yang dipanggil Yesus menjadi penjala manusia. Ia termasuk murid terdekat dan pernah mengaku Yesus sebagai Mesias.",
      "Pada malam Yesus ditangkap, Petrus takut dan menyangkal-Nya tiga kali sebelum ayam berkokok, lalu menangis dengan getir.",
      "Setelah kebangkitan, Yesus memulihkannya dan memintanya menggembalakan domba-domba-Nya. Petrus kemudian menjadi pemimpin jemaat mula-mula."
    ],
    pesan: "Kegagalan bukan akhir. Yesus memulihkan orang yang menyesal dan mau kembali.",
    petunjuk: "Aku menyangkal Yesus sebelum ayam berkokok."
  },
  {
    id: "zakheus", nama: "Zakheus", emoji: "🌲 👀 🏠", test: "PB", level: "sedang",
    ref: "Lukas 19:1–10",
    inti: "Pemungut cukai bertubuh pendek yang memanjat pohon untuk melihat Yesus.",
    kisah: [
      "Zakheus adalah kepala pemungut cukai di Yerikho yang kaya, tetapi tidak disukai karena sering memeras. Ia penasaran ingin melihat Yesus, namun badannya pendek dan terhalang kerumunan.",
      "Ia pun memanjat pohon ara. Yesus berhenti di bawah pohon itu, memanggilnya, dan berkata akan menumpang di rumahnya hari itu.",
      "Pertemuan itu mengubah Zakheus. Ia berjanji membagi separuh hartanya kepada orang miskin dan mengembalikan empat kali lipat kepada orang yang pernah ia peras."
    ],
    pesan: "Yesus menjangkau orang yang dianggap tidak layak, dan perjumpaan dengan-Nya mengubah hidup secara nyata.",
    petunjuk: "Aku pendek, naik pohon, dan Yesus menumpang di rumahku."
  },
  {
    id: "paulus", nama: "Paulus", emoji: "⚡ 🐎 ✉️", test: "PB", level: "sedang",
    ref: "Kisah Para Rasul 9",
    inti: "Penganiaya jemaat yang bertobat dan menjadi rasul bagi bangsa-bangsa.",
    kisah: [
      "Saulus awalnya menganiaya pengikut Yesus. Dalam perjalanan ke Damsyik untuk menangkap mereka, cahaya dari langit menyilaukannya dan ia mendengar suara Yesus.",
      "Ia buta selama beberapa hari sampai Ananias mendoakannya. Ia kemudian dibaptis dan mulai memberitakan Yesus.",
      "Paulus melakukan perjalanan misi ke banyak kota dan menulis banyak surat yang menjadi bagian Perjanjian Baru."
    ],
    pesan: "Kasih karunia sanggup mengubah siapa pun, bahkan orang yang paling menentang.",
    petunjuk: "Dulu namaku Saulus, aku buta setelah melihat cahaya di jalan ke Damsyik."
  },
  {
    id: "yudas", nama: "Yudas Iskariot", emoji: "💰 😘 🗡️", test: "PB", level: "sedang",
    ref: "Matius 26:14–16, 47–50",
    inti: "Salah satu dari dua belas murid yang menyerahkan Yesus demi uang.",
    kisah: [
      "Yudas adalah salah seorang dari dua belas murid dan memegang kas kelompok. Ia menemui imam-imam kepala dan sepakat menyerahkan Yesus dengan imbalan tiga puluh keping perak.",
      "Di Taman Getsemani, ia datang bersama pasukan dan menunjukkan siapa Yesus dengan sebuah ciuman.",
      "Setelah itu ia diliputi penyesalan dan mengembalikan uang itu, namun penyesalan itu berakhir tragis."
    ],
    pesan: "Cinta uang dan hati yang menjauh dari Tuhan bisa menuntun pada pengkhianatan.",
    petunjuk: "Aku menyerahkan Yesus dengan sebuah ciuman."
  },
  {
    id: "matius", nama: "Matius", emoji: "🧾 🪑 ✍️", test: "PB", level: "sedang",
    ref: "Matius 9:9–13",
    inti: "Pemungut cukai yang meninggalkan mejanya untuk mengikut Yesus.",
    kisah: [
      "Matius, juga dikenal sebagai Lewi, bekerja di pos pemungutan cukai. Pekerjaan ini membuatnya dijauhi sesama orang Yahudi.",
      "Yesus melihatnya dan berkata singkat, 'Ikutlah Aku.' Matius langsung berdiri dan mengikuti-Nya.",
      "Ia menjamu Yesus di rumahnya bersama banyak pemungut cukai dan orang berdosa. Kelak ia menulis Injil yang memakai namanya."
    ],
    pesan: "Panggilan Yesus ditujukan kepada orang biasa, dan jawaban yang sungguh-sungguh bisa mengubah arah hidup.",
    petunjuk: "Dulu aku bekerja menarik pajak, lalu menulis salah satu kitab Injil."
  },
  {
    id: "yohanes", nama: "Yohanes (murid Yesus)", emoji: "🏝️ 📖 🦅", test: "PB", level: "sedang",
    ref: "Wahyu 1:9–11",
    inti: "Murid yang dikasihi Yesus dan menerima penglihatan di Pulau Patmos.",
    kisah: [
      "Yohanes adalah nelayan yang dipanggil bersama saudaranya Yakobus. Ia termasuk murid terdekat Yesus dan disebut sebagai murid yang dikasihi-Nya.",
      "Ia hadir di dekat salib dan diminta Yesus merawat Maria. Setelah kebangkitan, ia terus melayani jemaat.",
      "Di masa tuanya ia diasingkan ke Pulau Patmos. Di sana ia menerima penglihatan yang dituliskan dalam kitab Wahyu."
    ],
    pesan: "Kedekatan dengan Yesus melahirkan kasih, dan kasih itu tampak dalam kesetiaan sampai akhir.",
    petunjuk: "Aku menulis penglihatan ketika diasingkan di sebuah pulau."
  },
  {
    id: "tomas", nama: "Tomas", emoji: "✋ 🔍 ❓", test: "PB", level: "sulit",
    ref: "Yohanes 20:24–29",
    inti: "Murid yang baru percaya setelah melihat bekas luka Yesus.",
    kisah: [
      "Ketika Yesus menampakkan diri kepada murid-murid setelah bangkit, Tomas tidak hadir. Saat diberi tahu, ia berkata tidak akan percaya sebelum melihat dan menyentuh bekas paku di tangan-Nya.",
      "Delapan hari kemudian, Yesus datang lagi dan mengundang Tomas untuk menyentuh bekas luka-Nya.",
      "Tomas pun mengaku, 'Ya Tuhanku dan Allahku!' Yesus berkata berbahagialah mereka yang percaya tanpa melihat."
    ],
    pesan: "Keraguan yang jujur dapat dibawa kepada Yesus, dan Ia dengan sabar menjawabnya.",
    petunjuk: "Aku baru percaya setelah melihat bekas luka di tangan Yesus."
  },
  {
    id: "lazarus", nama: "Lazarus", emoji: "⚰️ 🗣️ 👣", test: "PB", level: "sulit",
    ref: "Yohanes 11",
    inti: "Sahabat Yesus yang dibangkitkan setelah empat hari dalam kubur.",
    kisah: [
      "Lazarus, saudara Maria dan Marta dari Betania, jatuh sakit dan meninggal. Yesus baru tiba empat hari kemudian, dan kedua saudarinya sangat berduka.",
      "Yesus menangis bersama mereka. Lalu Ia memerintahkan batu penutup kubur digulingkan dan berseru, 'Lazarus, marilah ke luar!'",
      "Lazarus keluar dari kubur dengan kain kafan masih melilit. Banyak orang yang melihatnya menjadi percaya kepada Yesus."
    ],
    pesan: "Yesus berkuasa atas maut, dan Ia peduli pada duka kita.",
    petunjuk: "Aku keluar dari kubur setelah dipanggil dengan nama."
  },
  {
    id: "maria-magdalena", nama: "Maria Magdalena", emoji: "🌅 💐 🧴", test: "PB", level: "sulit",
    ref: "Yohanes 20:1–18",
    inti: "Orang pertama yang melihat Yesus bangkit.",
    kisah: [
      "Maria Magdalena adalah pengikut setia Yesus yang telah dipulihkan dari tekanan roh jahat. Ia hadir di salib saat Yesus wafat.",
      "Pada pagi hari pertama minggu itu, ia datang ke kubur dan mendapati batunya sudah terguling serta kubur kosong. Ia menangis karena mengira tubuh Yesus diambil orang.",
      "Yesus menyapanya dengan namanya, dan ia langsung mengenali-Nya. Ia diutus memberitakan kabar kebangkitan kepada murid-murid lain."
    ],
    pesan: "Kesetiaan di saat sulit dipertemukan dengan sukacita, dan siapa pun bisa diutus membawa kabar baik.",
    petunjuk: "Aku datang ke kubur pagi-pagi dan bertemu Yesus yang baru bangkit."
  },
  {
    id: "nikodemus", nama: "Nikodemus", emoji: "🌃 🕯️ 👤", test: "PB", level: "sulit",
    ref: "Yohanes 3:1–21",
    inti: "Pemimpin Yahudi yang menemui Yesus pada malam hari.",
    kisah: [
      "Nikodemus adalah seorang Farisi dan anggota Majelis Agama yang datang kepada Yesus pada malam hari, mungkin karena segan dilihat orang.",
      "Yesus berkata bahwa seseorang harus dilahirkan kembali untuk melihat Kerajaan Allah. Nikodemus bingung, lalu Yesus menjelaskan kasih Allah bagi dunia.",
      "Kemudian ia membela Yesus di hadapan para pemimpin dan membantu menguburkan-Nya bersama Yusuf dari Arimatea."
    ],
    pesan: "Mencari kebenaran bisa dimulai dengan pelan-pelan, dan iman dapat bertumbuh menjadi keberanian.",
    petunjuk: "Aku datang kepada Yesus di malam hari dan mendengar tentang dilahirkan kembali."
  },
  {
    id: "stefanus", nama: "Stefanus", emoji: "😇 ☄️ 🕊️", test: "PB", level: "sulit",
    ref: "Kisah Para Rasul 6–7",
    inti: "Martir pertama yang berdoa bagi orang yang melemparinya.",
    kisah: [
      "Stefanus adalah satu dari tujuh orang yang dipilih jemaat mula-mula untuk melayani kebutuhan sehari-hari. Ia penuh iman dan Roh Kudus.",
      "Ia ditangkap karena kesaksiannya tentang Yesus dan berpidato panjang di hadapan Mahkamah Agama. Mereka marah dan menyeretnya keluar kota.",
      "Saat dilempari batu, Stefanus berdoa agar dosa mereka tidak ditanggungkan kepada mereka. Seorang pemuda bernama Saulus ikut menyaksikan peristiwa itu."
    ],
    pesan: "Iman sejati terlihat dari kasih, bahkan terhadap orang yang menyakiti kita.",
    petunjuk: "Aku wafat dilempari batu sambil mendoakan para pelakunya."
  },
  {
    id: "marta", nama: "Marta", emoji: "🍲 🧹 😓", test: "PB", level: "sulit",
    ref: "Lukas 10:38–42",
    inti: "Perempuan yang sibuk melayani saat saudarinya duduk mendengarkan Yesus.",
    kisah: [
      "Marta membuka rumahnya di Betania untuk menerima Yesus. Ia sibuk mempersiapkan segala sesuatu supaya tamunya terlayani dengan baik.",
      "Sementara itu saudarinya Maria duduk dekat kaki Yesus dan mendengarkan pengajaran-Nya. Marta merasa kewalahan dan meminta Yesus menyuruh Maria membantu.",
      "Yesus dengan lembut berkata bahwa Marta kuatir akan banyak hal, padahal hanya satu yang perlu, dan Maria telah memilih bagian yang terbaik."
    ],
    pesan: "Pelayanan itu baik, tetapi kedekatan dengan Yesus tidak boleh tergeser oleh kesibukan.",
    petunjuk: "Aku sibuk di dapur, sementara saudariku duduk mendengarkan Yesus."
  }
];
