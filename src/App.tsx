import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MegaMenu } from './components/MegaMenu';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { ContactPage } from './pages/ContactPage';
import { CategoryPage } from './pages/CategoryPage';
import { LecturesPage } from './pages/LecturesPage';
import { BibliotekePage } from './pages/BibliotekePage';

// Layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-950">
      <MegaMenu />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/wyklady" element={<LecturesPage />} />
          <Route path="/kursy" element={<LecturesPage />} />
          <Route path="/lektury" element={<BlogPage />} />
          <Route path="/biblioteka" element={<BibliotekePage />} />
          <Route path="/starodruki" element={<BibliotekePage />} />
          
          {/* Category pages */}
          <Route path="/metafizyka" element={<CategoryPage />} />
          <Route path="/epistemologia" element={<CategoryPage />} />
          <Route path="/etyka" element={<CategoryPage />} />
          <Route path="/logika" element={<CategoryPage />} />
          <Route path="/tomizm" element={<CategoryPage />} />
          <Route path="/platonizm" element={<CategoryPage />} />
          <Route path="/arystotelizm" element={<CategoryPage />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
