// src/components/SimplePDFDocument.tsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
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

// Define os estilos do documento usando apenas fontes padrão
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
    backgroundColor: '#f8f4e8',
    fontFamily: 'Helvetica',
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
export const SimplePDFDocument = ({ data }: { data: InterviewData }) => (
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
