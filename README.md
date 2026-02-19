# AI Compliance Platform

**Automated AI Regulation Compliance for EU AI Act, Colorado AI Act & Emerging US State Laws**

> Think "Vanta/Drata, but for AI regulation."
>
> ---
>
> ## The Problem
>
> The EU AI Act's high-risk provisions kick in **August 2, 2026**. Colorado's AI Act follows in **February 2026**. Every company deploying AI in hiring, lending, healthcare, or insurance must produce conformity assessments, technical documentation (Annex IV), and risk classification -- or face fines up to **EUR 35 million or 7% of global revenue**.
>
> Right now, companies are paying $500K-$2M per system to consultants for manual assessments. Only 18% of organizations have any AI governance framework in place.
>
> ## The Solution
>
> A platform that:
>
> 1. **Auto-discovers AI systems** across an enterprise's tech stack
> 2. 2. **Classifies them by risk tier** per EU AI Act / Colorado / emerging US state laws
>    3. 3. **Auto-generates Annex IV technical documentation** from existing development artifacts
>       4. 4. **Produces audit-ready conformity evidence** packages
>         
>          5. ## Features
>         
>          6. ### Dashboard
>          7. Complete overview of all discovered AI systems, compliance status, upcoming regulatory deadlines, and risk distribution across your organization.
>         
>          8. ### Risk Classification Engine
> Automated risk tier classification per EU AI Act Article 6 & Annex III:
> - **Unacceptable Risk** -- Banned practices (social scoring, real-time biometric ID)
> - - **High Risk** -- Employment, credit, healthcare, law enforcement AI
>   - - **Limited Risk** -- Chatbots, emotion recognition, deepfakes (transparency obligations)
>     - - **Minimal Risk** -- Spam filters, AI-enabled games (no obligations)
>      
>       - Includes Colorado AI Act mapping for consequential decision systems.
>      
>       - ### Annex IV Documentation Generator
>       - Auto-generates the 12-section technical documentation package required by EU AI Act Annex IV:
>       - 1. General description of the AI system
> 2. Detailed description of elements and development process
> 3. 3. Monitoring, functioning and control
>    4. 4. Risk management system (Article 9)
>       5. 5. Data governance measures (Article 10)
>          6. 6. Human oversight measures (Article 14)
>             7. 7. Accuracy, robustness and cybersecurity (Article 15)
>                8. 8. Quality management system description
>                   9. 9. Changes through lifecycle
>                      10. 10. Harmonised standards applied
>                          11. 11. EU declaration of conformity
>                              12. 12. Post-market monitoring plan
>                                 
>                                  13. ### Conformity Assessment Module
>                                  14. Produces audit-ready evidence packages per Articles 43 & 49:
>                                  15. - Requirement-by-requirement compliance tracking
>                                      - - Evidence document management
>                                        - - Priority-based remediation guidance
>                                          - - Exportable compliance reports
>                                           
>                                            - ### Multi-Jurisdictional Regulation Tracker
>                                            - Monitors and maps requirements across:
>                                            - - EU AI Act (Regulation 2024/1689)
>                                              - - Colorado AI Act (SB 21-169)
>                                                - - Illinois AI Video Interview Act
>                                                  - - NYC Local Law 144 (AEDT)
>                                                    - - California AB 2013 (Training Data Transparency)
>                                                      - - Emerging state and international regulations
>                                                       
>                                                        - ## Tech Stack
>                                                       
>                                                        - - **Framework:** Next.js 15 (App Router)
>                                                          - - **Language:** TypeScript
>                                                            - - **Styling:** Tailwind CSS
>                                                              - - **UI:** Custom component library (dark theme)
>                                                               
>                                                                - ## Getting Started
>                                                               
>                                                                - ```bash
>                                                                  # Clone the repository
>                                                                  git clone https://github.com/naividh/ai-compliance-platform.git
>                                                                  cd ai-compliance-platform
>
>                                                                  # Install dependencies
>                                                                  npm install
>
>                                                                  # Start development server
>                                                                  npm run dev
>
>                                                                  # Open http://localhost:3000
>                                                                  ```
>
> ## Project Structure
>
> ```
> src/
>   app/
>     layout.tsx          # Root layout with metadata
>     page.tsx            # Main application page with navigation
>     globals.css         # Global styles and Tailwind imports
>   components/
>     dashboard/
>       Dashboard.tsx     # Main compliance dashboard
>     layout/
>       Sidebar.tsx       # Navigation sidebar
>       Header.tsx        # Top header bar
>     systems/
>       AISystemsRegistry.tsx  # AI system inventory management
>     classification/
>       RiskClassificationView.tsx  # Risk tier classification UI
>     documentation/
>       DocumentationCenter.tsx     # Annex IV doc generation
>     conformity/
>       ConformityAssessment.tsx    # Conformity evidence packages
>     regulations/
>       RegulationTracker.tsx       # Multi-jurisdictional tracker
>   lib/
>     risk-classification-engine.ts  # Core classification logic
>     annex-iv-generator.ts          # Annex IV doc generation engine
> ```
>
> ## Key Deadlines
>
> | Regulation | Deadline | Status |
> |---|---|---|
> | EU AI Act - AI Literacy | Feb 2, 2025 | Effective |
> | EU AI Act - Prohibited Practices | Aug 2, 2025 | Upcoming |
> | Colorado AI Act | Feb 1, 2026 | Upcoming |
> | EU AI Act - High-Risk Requirements | Aug 2, 2026 | Critical |
>
> ## Why It's Defensible
>
> Once you've mapped a company's AI systems and generated their compliance documentation, switching costs are enormous. Every new regulation update deepens the lock-in. Multi-jurisdictional mapping compounds the moat.
>
> ## Go-to-Market
>
> Target EU-exposed US multinationals and European enterprises. DPOs and Chief AI Officers are the buyers. **The deadline sells itself.**
>
> ## License
>
> MIT
>
> ---
>
> Built to help organizations navigate the complex landscape of AI regulation compliance.
