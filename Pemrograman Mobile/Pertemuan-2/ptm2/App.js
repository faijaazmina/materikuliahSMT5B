import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileIcon}>🧕🏻</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Curriculum</Text>
          <Text style={styles.title}>Vitae</Text>
          <Text style={styles.subtitle}>Personal Profile</Text>
        </View>
      </View>

      {/* CARD DATA DIRI */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Data Diri</Text>

        {/* NAMA LENGKAP */}
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>👤</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>Faija Kulla Azmina</Text>
          </View>
        </View>

        <View style={styles.line} />

        {/* NIM */}
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🎓</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.label}>NIM</Text>
            <Text style={styles.value}>2488010034</Text>
          </View>
        </View>

        <View style={styles.line} />

        {/* ASAL SEKOLAH */}
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🏫</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.label}>Asal Sekolah</Text>
            <Text style={styles.value}>
              SMA MUHAMMADIYAH KEDAWUNG
            </Text>
          </View>
        </View>
      </View>

      {/* CARD CITA-CITA & RENCANA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cita-cita & Rencana</Text>

        {/* CITA-CITA */}
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🎯</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.label}>Cita-cita</Text>
            <Text style={styles.value}>Quality Assurance Engineer</Text>
          </View>
        </View>

        <View style={styles.line} />

        {/* RENCANA */}
        <View style={styles.infoRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>💡</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.label}>
              Rencana Menggapai Cita-cita
            </Text>

            <Text style={styles.description}>
              Saya ingin belajar dari dasar tentang software testing, mencoba membuat test case sederhana, dan menambah pengalaman melalui berbagai proyek agar membantu meningkatkan kemampuan saya sebagai QA.
            </Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ©2026 | Curriculum Vitae
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FDECEC',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 5,
  },

  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8D1D1',
    borderWidth: 3,
    borderColor: '#A91D2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  profileIcon: {
    fontSize: 53,
  },

  headerText: {
    borderLeftWidth: 3,
    borderLeftColor: '#A91D2F',
    paddingLeft: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#941B2C',
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 15,
    color: '#A91D2F',
    marginTop: 7,
  },

  /* CARD */

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,

    shadowColor: '#8F1729',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#941B2C',
    backgroundColor: '#FCE1E1',
    alignSelf: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    marginBottom: 18,
  },

  /* INFORMATION */

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FCE1E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 23,
  },

  infoText: {
    flex: 1,
    paddingTop: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A91D2F',
    marginBottom: 5,
  },

  value: {
    fontSize: 17,
    color: '#292929',
    lineHeight: 23,
  },

  description: {
    fontSize: 15,
    color: '#3F3F3F',
    lineHeight: 23,
    marginTop: 2,
  },

  line: {
    height: 1,
    backgroundColor: '#F3D0D0',
    marginVertical: 15,
    marginLeft: 62,
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    marginTop: 2,
  },

  footerLine: {
    width: 45,
    height: 2,
    backgroundColor: '#B5263A',
    marginVertical: 8,
  },

  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#941B2C',
    marginVertical: 3,
  },
});