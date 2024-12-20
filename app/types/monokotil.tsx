// types/monokotil.tsx

export interface Monokotil {
  nama: string;
  gambar: string;
  deskripsi: string;
  ciri: {
    [key: string]: number;
  };
}

export interface Pertanyaan {
  id: string;
  teks: string;
  deskripsi: string;
}

export const Pertanyaan: Pertanyaan[] = [
  {
    id: "q1",
    teks: "Apakah tanaman ini memiliki biji?",
    deskripsi:
      "Biji adalah bagian penting dari tanaman untuk proses reproduksi.",
  },
  // Group 3: Bentuk
  {
    id: "q2",
    teks: "Apakah biji tanaman ini berbentuk besar?",
    deskripsi:
      "Biji yang besar biasanya mengandung lebih banyak nutrisi dan cadangan makanan.",
  },
  {
    id: "q3",
    teks: "Apakah biji tanaman ini berbentuk kecil?",
    deskripsi:
      "Biji kecil seringkali lebih ringan dan mudah tersebar oleh angin atau air.",
  },
  // Group 3: Kandungan
  {
    id: "q4",
    teks: "Apakah biji tanaman ini mengandung banyak gizi?",
    deskripsi:
      "Biji dengan kandungan gizi tinggi dapat digunakan sebagai sumber makanan utama.",
  },
  {
    id: "q5",
    teks: "Apakah biji tanaman ini kaya akan karbohidrat?",
    deskripsi:
      "Biji yang kaya karbohidrat sering menjadi sumber energi utama bagi manusia dan hewan.",
  },
  // Group 3: Fisik
  {
    id: "q6",
    teks: "Apakah biji tanaman ini tidak terlihat dengan mata telanjang?",
    deskripsi:
      "Beberapa biji sangat kecil sehingga sulit diamati tanpa alat bantu.",
  },
  {
    id: "q7",
    teks: "Apakah tanaman ini menghasilkan banyak biji?",
    deskripsi:
      "Tanaman yang menghasilkan banyak biji memiliki peluang reproduksi lebih tinggi.",
  },
  // Group 3: Menyebar
  {
    id: "q8",
    teks: "Apakah biji tanaman ini menyebar melalui air?",
    deskripsi:
      "Biji yang menyebar melalui air sering memiliki struktur yang memungkinkan untuk mengapung.",
  },

  // Group 2: AKAR
  {
    id: "q9",
    teks: "Apakah tanaman ini memiliki akar?",
    deskripsi:
      "Akar adalah organ tanaman yang berfungsi untuk menyerap air dan nutrisi dari tanah.",
  },
  // Group 3: Bentuk
  {
    id: "q10",
    teks: "Apakah akar tanaman ini berbentuk serabut?",
    deskripsi:
      "Akar serabut biasanya ditemukan pada tanaman monokotil dan berfungsi menyerap air secara luas.",
  },
  {
    id: "q11",
    teks: "Apakah akar tanaman ini berbentuk serabut dengan rimpang?",
    deskripsi:
      "Akar serabut dengan rimpang sering ditemukan pada tanaman seperti jahe dan kunyit.",
  },
  {
    id: "q12",
    teks: "Apakah akar tanaman ini berbentuk serabut dan epifit?",
    deskripsi:
      "Akar serabut epifit membantu tanaman yang hidup menempel pada pohon lain untuk mendapatkan kelembapan dari udara.",
  },
  // Group 3: Kegunaan
  {
    id: "q13",
    teks: "Apakah akar tanaman ini digunakan untuk menyimpan cadangan makanan?",
    deskripsi:
      "Beberapa tanaman seperti singkong atau wortel menggunakan akar untuk menyimpan cadangan makanan.",
  },
  {
    id: "q14",
    teks: "Apakah akar tanaman ini digunakan untuk menopang tanaman?",
    deskripsi:
      "Akar yang menopang tanaman membantu memberikan stabilitas, seperti akar tunjang pada bakau.",
  },
  {
    id: "q15",
    teks: "Apakah akar tanaman ini berfungsi menstabilkan tanah?",
    deskripsi:
      "Akar yang membantu menstabilkan tanah sering ditemukan pada tanaman dengan sistem perakaran luas.",
  },
  {
    id: "q16",
    teks: "Apakah akar tanaman ini digunakan untuk mencegah erosi?",
    deskripsi:
      "Tanaman dengan akar yang mencegah erosi sering digunakan untuk menjaga ekosistem di lereng bukit.",
  },
  {
    id: "q17",
    teks: "Apakah akar tanaman ini membantu bertahan dalam kondisi kering?",
    deskripsi:
      "Akar tanaman yang bertahan dalam kondisi kering sering ditemukan pada tanaman di daerah arid seperti kaktus.",
  },
  {
    id: "q18",
    teks: "Apakah batang tanaman ini tegak?",
    deskripsi:
      "Batang tegak biasanya ditemukan pada tanaman seperti pohon besar atau tanaman yang membutuhkan dukungan untuk tumbuh vertikal.",
  },
  {
    id: "q19",
    teks: "Apakah batang tanaman ini tinggi?",
    deskripsi:
      "Batang tinggi ditemukan pada tanaman yang tumbuh menjulang seperti pohon-pohon besar, dan biasanya berfungsi untuk mendapatkan sinar matahari lebih banyak.",
  },
  {
    id: "q20",
    teks: "Apakah batang tanaman ini pendek?",
    deskripsi:
      "Batang pendek sering ditemukan pada tanaman yang tumbuh merayap atau rendah, seperti semak-semak atau tanaman penutup tanah.",
  },
  {
    id: "q21",
    teks: "Apakah batang tanaman ini ramping?",
    deskripsi:
      "Batang ramping dapat ditemukan pada tanaman yang memerlukan sedikit ruang untuk tumbuh atau tanaman dengan struktur tumbuh ramping dan memanjang.",
  },
  {
    id: "q22",
    teks: "Apakah batang tanaman ini berbuku-buku?",
    deskripsi:
      "Batang berbuku-buku memiliki bagian yang terbagi secara teratur, seperti pada tanaman batang berbilah atau tanaman yang memiliki pertumbuhan berstruktur.",
  },
  {
    id: "q23",
    teks: "Apakah batang tanaman ini beruas?",
    deskripsi:
      "Batang beruas terlihat jelas dengan adanya segmen-segmen yang memisahkan bagian-bagian batang, seperti pada tanaman merambat atau tanaman berkayu.",
  },
  {
    id: "q24",
    teks: "Apakah batang tanaman ini tidak terlihat jelas?",
    deskripsi:
      "Pada beberapa tanaman, batang mungkin tidak begitu jelas, terutama pada tanaman merambat atau tanaman dengan batang yang sangat tipis atau tersembunyi.",
  },
  {
    id: "q25",
    teks: "Apakah batang tanaman ini berfungsi untuk menstabilkan tanaman?",
    deskripsi:
      "Batang yang berfungsi untuk menstabilkan tanaman penting untuk memberikan dukungan agar tanaman tetap tegak dan dapat tumbuh dengan baik.",
  },
  {
    id: "q26",
    teks: "Apakah tanaman ini memiliki batang dengan tinggi lebih dari 30 meter?",
    deskripsi:
      "Tanaman dengan batang setinggi lebih dari 30 meter biasanya adalah pohon besar seperti pohon pinus atau pohon eukaliptus.",
  },
  {
    id: "q27",
    teks: "Apakah tanaman ini memiliki batang dengan tinggi lebih dari 20 meter?",
    deskripsi:
      "Pohon dengan tinggi batang lebih dari 20 meter sering ditemukan pada tanaman yang tumbuh tinggi untuk mencapai sinar matahari secara maksimal.",
  },
  {
    id: "q28",
    teks: "Apakah daun tanaman ini memiliki tekstur tebal?",
    deskripsi:
      "Daun dengan tekstur tebal biasanya ditemukan pada tanaman yang tumbuh di daerah kering, seperti tanaman sukulen atau kaktus.",
  },
  {
    id: "q29",
    teks: "Apakah daun tanaman ini tajam?",
    deskripsi:
      "Beberapa tanaman memiliki daun yang tajam sebagai mekanisme pertahanan diri, seperti tanaman berduri atau tanaman dengan daun berbentuk lancip.",
  },
  {
    id: "q30",
    teks: "Apakah daun tanaman ini bervariasi bentuknya?",
    deskripsi:
      "Tanaman dengan daun yang bervariasi biasanya memiliki banyak jenis bentuk daun dalam satu tanaman, seperti pada beberapa tanaman tropis atau tanaman berbunga.",
  },
  {
    id: "q31",
    teks: "Apakah daun tanaman ini besar?",
    deskripsi:
      "Daun besar sering ditemukan pada tanaman tropis atau tanaman yang tumbuh di daerah dengan cahaya matahari yang cukup, seperti pohon pisang atau daun talas.",
  },
  {
    id: "q32",
    teks: "Apakah daun tanaman ini memiliki sabut?",
    deskripsi:
      "Beberapa tanaman memiliki daun berbentuk sabut, seperti pada tanaman kelapa atau tanaman lainnya yang memiliki daun panjang dan sempit.",
  },
  {
    id: "q33",
    teks: "Apakah daun tanaman ini ramping?",
    deskripsi:
      "Daun ramping sering ditemukan pada tanaman yang membutuhkan sedikit ruang atau tanaman dengan pertumbuhan vertikal yang sempit.",
  },
  {
    id: "q34",
    teks: "Apakah urat daun tanaman ini sejajar?",
    deskripsi:
      "Daun dengan urat sejajar biasanya dimiliki oleh tanaman berdaun panjang dan tipis, seperti rumput atau tanaman padi.",
  },
  {
    id: "q35",
    teks: "Apakah daun tanaman ini memiliki lebar sejajar?",
    deskripsi:
      "Beberapa tanaman memiliki daun yang lebar dengan urat sejajar, seperti pada tanaman palem atau pisang.",
  },
  {
    id: "q36",
    teks: "Apakah tulang daun pada tanaman ini jelas terlihat?",
    deskripsi:
      "Tulang daun yang jelas terlihat menunjukkan struktur daun yang terorganisir dengan baik, seperti pada tanaman dengan daun besar seperti talas atau keladi.",
  },
  {
    id: "q37",
    teks: "Apakah daun tanaman ini berfungsi untuk memaksimalkan penyerapan cahaya matahari?",
    deskripsi:
      "Daun yang memaksimalkan penyerapan cahaya matahari umumnya memiliki permukaan yang besar dan tebal, seperti pada tanaman yang membutuhkan banyak cahaya untuk fotosintesis.",
  },
  {
    id: "q38",
    teks: "Apakah daun tanaman ini berfungsi untuk menyimpan air?",
    deskripsi:
      "Beberapa tanaman memiliki daun yang berfungsi untuk menyimpan air, seperti tanaman sukulen yang memiliki daun tebal dan berair.",
  },
  {
    id: "q39",
    teks: "Apakah panjang daun tanaman ini lebih dari 4 meter?",
    deskripsi:
      "Beberapa tanaman tropis besar, seperti pohon talas atau pisang, memiliki daun yang sangat panjang, bahkan mencapai lebih dari 4 meter.",
  },
  {
    id: "q40",
    teks: "Apakah panjang daun tanaman ini lebih dari 3 meter?",
    deskripsi:
      "Beberapa tanaman besar memiliki daun yang panjang, seperti pada pohon kelapa atau tanaman yang tumbuh di daerah tropis dengan sinar matahari yang cukup.",
  },
  {
    id: "q41",
    teks: "Apakah daun tanaman ini panjang?",
    deskripsi:
      "Daun panjang biasanya ditemukan pada tanaman yang memiliki daun memanjang dan tipis, seperti pada beberapa jenis pohon atau tanaman tropis.",
  },
  {
    id: "q42",
    teks: "Apakah bunga tanaman ini memiliki bunga jantan dan betina terpisah?",
    deskripsi:
      "Beberapa tanaman memiliki bunga jantan dan betina yang terpisah, seperti pada tanaman kelapa atau tanaman jagung.",
  },
  {
    id: "q43",
    teks: "Apakah bunga tanaman ini kecil?",
    deskripsi:
      "Bunga kecil sering ditemukan pada tanaman seperti rumput atau tanaman berbunga kecil lainnya yang tidak memiliki bunga besar.",
  },
  {
    id: "q44",
    teks: "Apakah bunga tanaman ini berwarna cerah?",
    deskripsi:
      "Bunga dengan warna cerah umumnya ditemukan pada tanaman yang menarik perhatian penyerbuk, seperti bunga matahari atau bunga lili.",
  },
  {
    id: "q45",
    teks: "Apakah bunga tanaman ini memiliki warna yang bervariasi?",
    deskripsi:
      "Bunga dengan warna yang bervariasi biasanya ditemukan pada tanaman yang memiliki banyak jenis warna bunga dalam satu spesies, seperti pada tanaman mawar atau anggrek.",
  },
  {
    id: "q46",
    teks: "Apakah bunga tanaman ini berwarna putih kekuningan?",
    deskripsi:
      "Beberapa bunga berwarna putih kekuningan, seperti bunga kenanga atau bunga melati, sering ditemukan pada tanaman yang berbunga di malam hari.",
  },
  {
    id: "q47",
    teks: "Apakah bunga tanaman ini berfungsi untuk menarik penyerbuk?",
    deskripsi:
      "Bunga yang berfungsi untuk menarik penyerbuk biasanya memiliki warna cerah dan aroma harum untuk menarik serangga atau burung.",
  },
  {
    id: "q48",
    teks: "Apakah bunga tanaman ini memfasilitasi penyerbukan?",
    deskripsi:
      "Beberapa bunga memiliki struktur yang memudahkan penyerbukan, seperti bunga yang memiliki organ reproduksi yang saling mendekatkan antara sari dan putik.",
  },
  {
    id: "q49",
    teks: "Apakah bunga tanaman ini tergolong dalam kelompok bunga kecil?",
    deskripsi:
      "Beberapa tanaman memiliki bunga yang termasuk dalam kelompok bunga kecil, seperti tanaman rumput atau tanaman yang memiliki banyak bunga kecil dalam satu kelompok.",
  },
  {
    id: "q50",
    teks: "Apakah berkas pembuluh tanaman ini terletak acak dalam batang?",
    deskripsi:
      "Berkas pembuluh yang terletak acak dalam batang biasanya ditemukan pada tanaman monokotil seperti padi atau jagung, yang memiliki sistem pembuluh yang tidak teratur.",
  },
  {
    id: "q51",
    teks: "Apakah berkas pembuluh tanaman ini mendukung transportasi air dan nutrisi?",
    deskripsi:
      "Berkas pembuluh berfungsi untuk mendukung transportasi air dan nutrisi dalam tanaman, dan ini penting bagi kelangsungan hidup tanaman dengan memastikan distribusi yang efisien.",
  },
  {
    id: "q52",
    teks: "Apakah pertumbuhan tanaman ini tergolong cepat?",
    deskripsi:
      "Tanaman dengan pertumbuhan cepat sering ditemukan pada tanaman yang tumbuh subur dan cepat mencapai tahap dewasa, seperti tanaman padi atau jagung.",
  },
  {
    id: "q53",
    teks: "Apakah pertumbuhan tanaman ini tergolong lambat?",
    deskripsi:
      "Tanaman dengan pertumbuhan lambat biasanya memiliki proses pertumbuhan yang lebih lama dan cenderung memerlukan perawatan khusus untuk berkembang, seperti tanaman bonsai.",
  },
  {
    id: "q54",
    teks: "Apakah tanaman ini tumbuh di tanah basah?",
    deskripsi:
      "Beberapa tanaman lebih suka tumbuh di tanah basah, seperti tanaman padi atau tanaman rawa lainnya, yang membutuhkan kelembapan tinggi untuk tumbuh.",
  },
  {
    id: "q55",
    teks: "Apakah tanaman ini tumbuh di daerah rawa?",
    deskripsi:
      "Tanaman yang tumbuh di daerah rawa biasanya dapat bertahan di tanah yang tergenang air, seperti tanaman papirus atau tanaman rawa lainnya.",
  },
  {
    id: "q56",
    teks: "Apakah tanaman ini tumbuh di kondisi lembab?",
    deskripsi:
      "Tanaman yang tumbuh di kondisi lembab biasanya ditemukan di daerah yang memiliki kelembapan tinggi, seperti hutan hujan tropis atau daerah pegunungan.",
  },
  {
    id: "q57",
    teks: "Apakah tanaman ini tumbuh di daerah tropis?",
    deskripsi:
      "Tanaman yang tumbuh di daerah tropis umumnya menyukai iklim panas dan lembab, seperti tanaman kelapa atau pisang yang tumbuh subur di daerah tropis.",
  },
  {
    id: "q58",
    teks: "Apakah stomata tanaman ini teratur?",
    deskripsi:
      "Stomata yang teratur ditemukan pada tanaman yang memiliki pola distribusi stomata yang simetris dan teratur, memudahkan proses pertukaran gas dan fotosintesis.",
  },
  {
    id: "q59",
    teks: "Apakah stomata pada tanaman ini digunakan untuk pertukaran gas?",
    deskripsi:
      "Stomata berfungsi untuk pertukaran gas, seperti oksigen dan karbon dioksida, yang diperlukan untuk proses fotosintesis dan respirasi pada tanaman.",
  },
  {
    id: "q60",
    teks: "Apakah stomata pada tanaman ini digunakan dalam fotosintesis?",
    deskripsi:
      "Stomata juga berperan dalam fotosintesis dengan memungkinkan karbon dioksida masuk ke dalam daun untuk proses pembentukan glukosa.",
  },
  {
    id: "q61",
    teks: "Apakah stomata pada tanaman ini digunakan untuk respirasi?",
    deskripsi:
      "Respirasi tanaman juga terjadi melalui stomata, di mana oksigen masuk dan karbon dioksida keluar selama proses pernapasan seluler.",
  },
  {
    id: "q62",
    teks: "Apakah tanaman ini merupakan makanan pokok?",
    deskripsi:
      "Beberapa tanaman seperti padi, jagung, dan ubi kayu merupakan sumber utama makanan pokok bagi banyak masyarakat di berbagai negara.",
  },
  {
    id: "q63",
    teks: "Apakah tanaman ini digunakan sebagai pakan ternak?",
    deskripsi:
      "Tanaman seperti rumput dan jagung sering digunakan sebagai pakan ternak untuk mendukung pertumbuhan dan kesehatan hewan ternak.",
  },
  {
    id: "q64",
    teks: "Apakah tanaman ini digunakan sebagai rempah?",
    deskripsi:
      "Tanaman seperti jahe, kunyit, dan lada digunakan sebagai rempah dalam berbagai masakan untuk memberikan rasa dan aroma khas.",
  },
  {
    id: "q65",
    teks: "Apakah tanaman ini digunakan sebagai obat?",
    deskripsi:
      "Beberapa tanaman memiliki khasiat sebagai obat tradisional, seperti daun sirih, daun kemuning, atau lidah buaya, yang digunakan untuk mengatasi berbagai penyakit.",
  },
  {
    id: "q66",
    teks: "Apakah tanaman ini digunakan sebagai bahan bangunan?",
    deskripsi:
      "Tanaman seperti bambu, kayu, dan pohon kelapa sering digunakan sebagai bahan bangunan untuk konstruksi rumah dan struktur lainnya.",
  },
  {
    id: "q67",
    teks: "Apakah tanaman ini digunakan sebagai bahan kerajinan?",
    deskripsi:
      "Beberapa tanaman digunakan sebagai bahan kerajinan, seperti pandan untuk anyaman atau bambu untuk membuat furnitur dan barang-barang dekoratif.",
  },
];
