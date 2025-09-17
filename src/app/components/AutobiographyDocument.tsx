// src/components/AutobiographyDocument.tsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Interface para definir a estrutura dos dados da entrevista
interface InterviewData {
  authorName: string;
  title: string;
  chapters: {
    question: string;
    answer: string;
  }[];
}

// Registra a fonte da máquina de escrever
// Para Vercel, usamos a URL absoluta do domínio de produção
Font.register({
  family: 'Special Elite',
  src: 'https://checkpoint-ghostwriter-so16.vercel.app/fonts/SpecialElite-Regular.ttf',
});

// Fallback para caso a fonte não carregue
Font.register({
  family: 'Special Elite',
  src: 'https://fonts.gstatic.com/s/specialelite/v18/XLYgIZbP4Yp_4nxmi2VnF42dF7I0BYlK.ttf',
});

// Define os estilos do documento, similar ao CSS-in-JS
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
    backgroundColor: '#f8f4e8', // Um tom de papel antigo
    fontFamily: 'Special Elite',
  },
  coverPage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 20,
  },
  author: {
    fontSize: 24,
    textAlign: 'center',
    color: 'grey',
  },
  chapterTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa',
    paddingBottom: 5,
  },
  answerText: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

// O componente que define a estrutura do PDF
export const AutobiographyDocument = ({ data }: { data: InterviewData }) => (
  <Document
    author={data.authorName}
    title={data.title}
  >
    {/* --- Página de Rosto --- */}
    <Page size="A5" style={styles.page}>
      <View style={styles.coverPage}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.author}>por</Text>
        <Text style={styles.author}>{data.authorName}</Text>
      </View>
    </Page>

    {/* --- Capítulos da Autobiografia --- */}
    <Page size="A5" style={styles.page}>
       {data.chapters.map((chapter, index) => (
         <View key={index} break={index !== 0}>
           <Text style={styles.chapterTitle}>{chapter.question}</Text>
           <Text style={styles.answerText}>{chapter.answer}</Text>
         </View>
       ))}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber - 1} / ${totalPages - 1}`}
        fixed
      />
    </Page>
  </Document>
);