// Import Library 
import React, {useState} from "react";

//Import Components 
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from 'react-native';

const PROFILE = {
  name: 'Faija Kulla Azmina',
  title: 'Mahasiswa Informatika',
  email: 'faijaazmina42@gmail.com',
  phone: '082147083065',
  location: 'Cirebon, Jawa Barat',
  bio: 'Mahasiswa jurusan Informatika semester 5, UIN Siber Syekh Nurjati Cirebon',
  avatarOffline: 'assets/photo_faija.jpeg'
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter',      level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript',   level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript',   level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js',      level: 70, color: '#339933' },
  { id: '6', name: 'Firebase',     level: 82, color: '#FFCA28' },
];

const SECTIONS = [
  {
    title: '💼 Pengalaman Kepanitiaan',
    data: [
      {
        id: 'e1',
        role: 'Anggota Divisi Humas',
        company: 'Social Impact Hub by NovoClub',
        period: 'Juli - Agustus 2026',
        desc: 'Bertanggung jawab dalam menjalin hubungan publik, publikasi, dan komunikasi program Social Impact Hub.',
      },
      {
        id: 'e2',
        role: 'Anggota Divisi Acara',
        company: 'Perayaan Milad SMAM Ke-54',
        period: '2023',
        desc: 'Merencanakan, menyusun rundown, dan mengkoordinasikan eksekusi kegiatan Perayaan Milad SMAM Ke-54.',
      },
      {
        id: 'e2',
        role: 'Anggota Divisi Acara',
        company: 'MPLS & Fortasi SMA Muhammadiyah Kedawung',
        period: '2022',
        desc: 'Mengonsep, menyusun rundown, dan mendampingi siswa baru selama rangkaian kegiatan MPLS & Fortasi.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2029',
        desc: 'IPK 3.72 / 4.00 · Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },
      {
        id: 'd1',
        role: 'Siswi SMA',
        company: 'SMA Muhammadiyah Kedawung',
        period: '2021 - 2024',
        desc: 'Menempuh 3 tahun duduk dibangku SMA jurusan IPA dan menyelesaikannya dengan baik.',
       },
    ],
  },
];

// DATA SOSIAL MEDIA
const SOCIAL = [
  { id: 's1', label: 'GitHub',   icon: '🐙', url: 'https://github.com/faijaazmina' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/faija-kulla-azmina-1283903b2?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 's3', label: 'Instagram', icon: '🅾', url: 'https://www.instagram.com/azminaaf_' },
];


// ===================================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList untuk render tiap skill
// Props: item -> { name, level, color }
// ===================================================
const SkillCard = ({ item }) => (
  // 1. View -> container kartu
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      {/* 2. Text -> nama skill */}
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// ===================================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item -> { role, company, period }, onPress
// ===================================================
const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity -> tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}    // opacity saat ditekan (0-1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {

  // -- STATE ------------------------------------
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage]       = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  // -- HANDLER FUNCTIONS -------------------------
  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item);    // simpan item yang dipilih
    setModalVisible(true);    // tampilkan modal
  };

  // Dipanggil saat tombol "Kirim Pesan" ditekan
    const handleSend = () => {
      if (!senderName.trim() || !message.trim()) {
      setSuccessMessage('⚠️ Nama dan pesan tidak boleh kosong!');
      return;
  }

      setSuccessMessage('');
      setSending(true);

      setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      setSuccessMessage('✅ Pesan berhasil terkirim!');
    }, 2000);
};

return (
  <SafeAreaView style={styles.safeArea}>

    <StatusBar
      backgroundColor="#1a1a2e"
      barStyle="light-content"
    />

    <View style={styles.headerBar}>

      <Text style={styles.headerTitle}>
        📄 Curriculum Vitae
      </Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>
          {openToWork ? '🟢 Open' : '🔴 Busy'}
        </Text>

        <Switch
          value={openToWork}
          onValueChange={setOpenToWork}
          trackColor={{
            false: '#555',
            true: '#4ade80',
          }}
          thumbColor={openToWork ? '#fff' : '#aaa'}
        />
      </View>
    </View>

    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

      <View style={styles.profileSection}>

        <Image
         source={require('./assets/photo_faija.jpeg')}
         style={styles.avatar}
        />

        {openToWork && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✅ Open to Work</Text>
          </View>
        )}

        <Text style={styles.profileName}>
      {PROFILE.name}
        </Text>

        <Text style={styles.profileTitle}>
      {PROFILE.title}
        </Text>

        <Text style={styles.profileBio}>
      {PROFILE.bio}
        </Text>

        <View style={styles.contactRow}>
        <Text style={styles.contactItem}>
        📧 {PROFILE.email}
        </Text>

        <Text style={styles.contactItem}>
        📍 {PROFILE.location}
        </Text>
    </View>

        <Text style={styles.contactItem}>
      📱 {PROFILE.phone}
        </Text>

    {/* SOCIAL MEDIA */}
    <View style={styles.socialRow}>

  {SOCIAL.map((s) => (

    <TouchableOpacity
      key={s.id}
      style={styles.socialBtn}
      activeOpacity={0.7}
        onPress={() => {
          setSelectedSocial(s);
          setSocialModalVisible(true);
     }}
     >

      <Text style={styles.socialIcon}>
        {s.icon}
      </Text>

      <Text style={styles.socialLabel}>
        {s.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>

    {/* DOWNLOAD CV */}
    <Pressable
      style={({ pressed }) => [
        styles.downloadBtn,
        pressed && styles.downloadBtnPressed,
      ]}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
      onPress={() => {
        setPressing(false);
        setDownloadModalVisible(true);
      }}
    >
      <Text style={styles.downloadBtnText}>
        {pressing
          ? '⏳ Mengunduh...'
          : '⬇️ Download CV (PDF)'}
      </Text>
    </Pressable>
  </View>

  {/* SECTION SKILLS */}
  <View style={styles.sectionBox}>
    <Text style={styles.sectionTitle}>
      🛠️ Keahlian
    </Text>
    <Text style={styles.sectionSubtitle}>
      → FlatList: menampilkan list data secara efisien
    </Text>

    <FlatList
      data={SKILLS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SkillCard item={item} />
      )}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 8 }} />
      )}
    />
  </View>
    
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>📄 Riwayat</Text>
      <Text style={styles.sectionSubtitle}>
    ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
      </Text>

  {/* 6. SectionList -> pengalaman & pendidikan */}
  <SectionList
    sections={SECTIONS}                  // array of { title, data[] }
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      // TimelineCard punya onPress untuk membuka Modal
      <TimelineCard item={item} onPress={handleCardPress} />
    )}
    // renderSectionHeader: header untuk tiap kelompok
    renderSectionHeader={({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )}
    scrollEnabled={false}
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
  />
</View>

<View style={styles.sectionBox}>
  <Text style={styles.sectionTitle}>💻 Hubungi Saya</Text>
  <Text style={styles.sectionSubtitle}>
    ↳ TextInput, Button, ActivityIndicator
  </Text>

  {/* 7. TextInput -> input nama (single line) */}
  <TextInput
    style={styles.textInput}
    placeholder="Nama Anda"
    placeholderTextColor="#888"
    value={senderName}            // nilai terkontrol dari state
    onChangeText={setSenderName}  // update state setiap ketik
    returnKeyType="next"          // label tombol keyboard
    editable={!sending}          // nonaktif saat loading
  />

  {/* 7. TextInput -> input pesan (multiline = seperti textarea) */}
  <TextInput
    style={[styles.textInput, styles.textArea]} // gabungkan 2 style
    placeholder="Tulis pesan Anda di sini..."
    placeholderTextColor="#888"
    value={message}
    onChangeText={setMessage}
    multiline                     // aktifkan multiline
    numberOfLines={4}             // tinggi awal 4 baris
    textAlignVertical="top"       // teks mulai dari atas (Android)
    editable={!sending}
  />

  {/* Kondisi: tampilkan loading atau tombol kirim */}
  
    {sending ? (
    <View style={styles.loadingRow}>
      <ActivityIndicator size="large" color="#7c3aed" />
      <Text style={styles.loadingText}>
        Mengirim pesan...
      </Text>
    </View>
  ) : (
    <Button
      title="💻 Kirim Pesan"
      color="#7c3aed"
      onPress={handleSend}
    />
  )}

   {successMessage !== '' && (
    <View
      style={{
        marginTop: 15,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#052e16',
        borderWidth: 1,
        borderColor: '#4ade80',
      }}
    >
      <Text
        style={{
          color: '#4ade80',
          fontSize: 14,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {successMessage}
      </Text>
    </View>
  )}

</View>

<View style={{ height: 40 }} />
</ScrollView>

  {/* MODAL KONFIRMASI SOCIAL */}
<Modal
  visible={socialModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setSocialModalVisible(false)}
>
  <View style={styles.socialModalOverlay}>
    <View style={styles.socialModalBox}>

      <Text style={styles.socialModalTitle}>
        Buka {selectedSocial?.label}?
      </Text>

      <Text style={styles.socialModalText}>
        Apakah kamu ingin membuka {selectedSocial?.label}?
      </Text>

      <View style={styles.socialModalButtons}>

        <TouchableOpacity
  style={styles.socialCancelBtn}
  onPress={() => {
    setSocialModalVisible(false);
  }}
>
  <Text style={styles.socialCancelText}>Batal</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.socialOpenBtn}
          onPress={() => {
            const url = selectedSocial?.url;

            setSocialModalVisible(false);
            setSelectedSocial(null);

            if (url) {
              if (Platform.OS === 'web') {
                window.location.href = url;
              } else {
                Linking.openURL(url);
              }
            }
          }}
        >
          <Text style={styles.socialOpenText}>Buka</Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
</Modal> 

  {/* MODAL KONFIRMASI DOWNLOAD */}
<Modal
  visible={downloadModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setDownloadModalVisible(false)}
>
  <View style={styles.socialModalOverlay}>
    <View style={styles.socialModalBox}>

      <Text style={styles.socialModalTitle}>
        ⬇️ Download CV?
      </Text>

      <Text style={styles.socialModalText}>
        CV kamu siap untuk diunduh. Apakah kamu ingin melanjutkan?
      </Text>

      <View style={styles.socialModalButtons}>

        <TouchableOpacity
          style={styles.socialCancelBtn}
          onPress={() => setDownloadModalVisible(false)}
        >
          <Text style={styles.socialCancelText}>
            Batal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialOpenBtn}
          onPress={() => {
            setDownloadModalVisible(false);

            Alert.alert(
              '✅ Berhasil',
              'CV berhasil diproses untuk diunduh.'
            );
          }}
        >
          <Text style={styles.socialOpenText}>
            Download
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
</Modal>

  <Modal
  visible={modalVisible}            // tampilkan jika true
  animationType="slide"             // animasi: 'slide', 'fade', 'none'
  transparent                       // latar transparan (overlay)
  onRequestClose={() => setModalVisible(false)} // tombol back Android
>
  {/* Overlay gelap di belakang dialog */}
  <View style={styles.modalOverlay}>

    {/* Kotak dialog */}
    <View style={styles.modalBox}>
      {/* Render isi hanya jika ada item yang dipilih */}
      {selectedItem && (
        <>
          <Text style={styles.modalTitle}>{selectedItem.role}</Text>
          <Text style={styles.modalCompany}>{selectedItem.company}</Text>
          <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
          <View style={styles.modalDivider} />
          <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
        </>
      )}

      {/* Tombol tutup modal */}
      <TouchableOpacity
        style={styles.modalCloseBtn}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
  </SafeAreaView>
);
}

const COLORS = {
  bg: '#0f0f1a',          // latar belakang
  card: '#1a1a2e',        // kartu/panel
  cardBorder: '#2d2d44',  // border kartu
  accent: '#7c3aed',      // ungu utama
  accentLight: '#a78bfa', // ungu muda
  accentGold: '#f59e0b',  // emas
  text: '#f0f0f0',        // teks utama
  textMuted: '#9ca3af',   // teks redup
  textDim: '#6b7280',     // teks sangat redup
  success: '#4ade80',     // hijau
  white: '#ffffff',
};

const styles = StyleSheet.create({

  // ── LAYOUT DASAR ─────────────────────────────────
  safeArea: {
    flex: 1,                       // isi penuh layar
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',              // anak tersusun hori
    justifyContent: 'space-between',   // ujung kiri & kanan
    alignItems: 'center',              // rata tengah vertikal
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,                      // bayangan (Android)
    shadowColor: '#000',               // bayangan (iOS)
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                            // jarak antar anak
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  //section profil
  profileSection: {
    alignItems: 'center',              // rata tengah horizontal
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,       // sudut kiri bawah melengkung
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,                 // lingkaran (width/2)
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,                   // tinggi tiap baris teks
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',                  // bungkus ke baris baru jika tidak muat
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  //sosial media 
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  
  socialModalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 25,
},

socialModalBox: {
  width: '100%',
  maxWidth: 400,
  backgroundColor: '#1a1a2e',
  borderRadius: 20,
  padding: 25,
  borderWidth: 1,
  borderColor: COLORS.accent,
},

socialModalTitle: {
  color: COLORS.white,
  fontSize: 20,
  fontWeight: '800',
  textAlign: 'center',
  marginBottom: 10,
},

socialModalText: {
  color: COLORS.textMuted,
  fontSize: 14,
  textAlign: 'center',
  marginBottom: 25,
},

socialModalButtons: {
  flexDirection: 'row',
  gap: 12,
},

socialCancelBtn: {
  flex: 1,
  backgroundColor: '#2d2d44',
  paddingVertical: 13,
  borderRadius: 10,
  alignItems: 'center',
},

socialCancelText: {
  color: COLORS.white,
  fontWeight: '600',
},

socialOpenBtn: {
  flex: 1,
  backgroundColor: COLORS.accent,
  paddingVertical: 13,
  borderRadius: 10,
  alignItems: 'center',
},

socialOpenText: {
  color: COLORS.white,
  fontWeight: '700',
}, 

  //presale download 
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,                   // pill shape
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',          // lebih gelap saat ditekan
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  //section box
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  //section list header 
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

//section box
sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  //section list header 
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

// skill card
skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName:    { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',                 // clip anak yang melampaui batas
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  //timeline card
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole:    { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod:  { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint:    { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },

  //text input 
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    // Platform.OS membedakan iOS dan Android
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
},
textArea: {
    height: 100,
    textAlignVertical: 'top',       // teks mulai dari atas (Android)
},

//loading row 
loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
},
loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
},

modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',  // hitam transparan
    justifyContent: 'flex-end',          // konten di bawah
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle:    { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany:  { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod:   { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider:  { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc:     { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});
