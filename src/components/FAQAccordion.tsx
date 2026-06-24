import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { 
      question: "How much subsidy can I get?", 
      answer: "Under the PM Surya Ghar Yojana scheme, residential systems get subsidies capped at ₹78,000. 1kW receives ₹30,000, 2kW receives ₹60,000, and 3kW or higher gets the full ₹78,000. Our team handles 100% of the application paperwork and approval tracking on your behalf." 
    },
    { 
      question: "What is the payback period of the system?", 
      answer: "With Rajasthan's ample sunshine, the average payback period for residential solar ranges between 3 to 3.8 years. After this initial duration, the power generated is completely free. Panels are warranted for performance for 25 years, resulting in over 21 years of pure profit." 
    },
    { 
      question: "Do you provide installation warranty and maintenance?", 
      answer: "Yes! We provide 5 years of comprehensive free maintenance, which includes scheduled cleaning visits, real-time performance tracking via mobile application, and technical repair coverage. The solar panels carry a 25-year manufacturer performance warranty." 
    },
    { 
      question: "How long does the entire installation process take?", 
      answer: "The structural physical installation on your rooftop takes just 1 to 2 days. The complete cycle — including initial site survey, design drafting, municipal Net-Metering approvals, government subsidy sanctioning, and commissioning — is finished within 4 to 5 weeks." 
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div 
            key={index} 
            style={{
              ...styles.faqItem,
              borderColor: isOpen ? 'var(--accent)' : 'var(--border)',
              backgroundColor: isOpen ? 'var(--bg-secondary)' : 'var(--bg-primary)'
            }}
          >
            <button 
              onClick={() => toggleFAQ(index)} 
              style={styles.triggerButton}
              aria-expanded={isOpen}
            >
              <span style={{
                ...styles.question,
                color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}>
                {faq.question}
              </span>
              <div style={{
                ...styles.iconContainer,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: isOpen ? 'var(--accent)' : 'var(--text-secondary)'
              }}>
                <ChevronDown size={22} />
              </div>
            </button>
            <div 
              style={{
                ...styles.answerContainer,
                maxHeight: isOpen ? '160px' : '0px',
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? '1.5rem' : '0px'
              }}
            >
              <p style={styles.answerText}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  },
  faqItem: {
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  triggerButton: {
    width: '100%',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
    outline: 'none',
  },
  question: {
    fontSize: '1.1rem',
    fontWeight: '600',
    paddingRight: '1rem',
    transition: 'color 0.3s ease',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease',
  },
  answerContainer: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  answerText: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  }
};
