"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

const COMMANDS: { [key: string]: string } = {
  help: `Available commands:
help              Show this help message
whoami            Display user information
cat resume.txt    Show my resume
show projects     List my main projects
nmap scan         Run network scan simulation
exit              Close the terminal`,

  whoami: `user: ibenmessaoud
email: ibenmessoud@estin.dz
linkedin: https://linkedin.com/in/ibtissem
github: https://github.com/harosama
role: Cybersecurity Engineer (M2, ESTIN)
status: Entry-Level in cybersecurity| Open to Opportunities in Algeria`,

  "cat resume.txt": `IBTISSEM BENMESSAOUD
Cybersecurity Engineer

Email: ibenmessoud@estin.dz
LinkedIn: linkedin.com/in/ibtissem
GitHub: github.com/harosama

A PROPOS DE MOI
Ingenieure en informatique, diplomee en Master 2 Cybersecurite, motivee et 
prete a apprendre pour progresser dans ce domaine. Passionnee par le pentesting 
et le developpement d'outils de securite, j'ai participe a plusieurs CTFs et 
contribue a l'organisation d'evenements en cybersecurite. Je suis particulierement 
interessee par les opportunites professionnelles a Alger.

FORMATION
• Ecole Superieure des Sciences et Technologies de l'Informatique (ESTIN)
  Bejaia, Algerie | 2022 – Sep. 2025
  Diplome d'Ingenieure en Informatique & Master 2 Cybersecurite

• Ecole Superieure de l'Informatique (ESI)
  Alger, Algerie | 2020 – 2022
  Cycle preparatoire en informatique

• Baccalaureat en Mathematiques – Mention Tres Bien
  Algerie | 2019 – 2020

EXPERIENCE PROFESSIONNELLE
• CPI Algerie – Stagiaire Pentest (PFE) | Fev. 2025 – Sep. 2025
  Developpement d'une plateforme de pentesting web basee sur la matrice MITRE 
  ATT&CK Enterprise, automatisation du reporting et tableau de bord React.

• Algerie Telecom – Stagiaire Telecoms | Juin 2024 – Sep. 2024
  Configuration MSAN/OLT, Gestion reseaux optiques ZTE

PROJETS & COMPETITIONS
• Developpement Web & Cybersecurite (ESTIN) | 2023 – 2025
  Site e-commerce React.js, Attaques phishing/DDoS educatives

• CTFs & Vie Associative | 2022 – PRESENT
  NexZero, Hackini (7eme), CSAW, CTFELDjazair (14eme/41)
  Chef Relations Externes Club NEXUS

COMPETENCES TECHNIQUES
• Cybersecurite: Pentest (MITRE ATT&CK, Nmap, Metasploit), Vulnerabilites,
  Phishing, DDoS, TryHackMe, PicoCTF, Cisco, Crypto

• Reseaux: MSAN/OLT, BSS, ZTE, TCP/IP, DNS, DHCP, Wireshark, Packet Tracer

• Programmation: Python, Bash, PowerShell, HTML/CSS, C

• Developpement: React.js, Node.js, JavaScript, Responsive Design

• Systemes: Linux (Kali, Ubuntu, Mint), Windows

• Outils: Git/GitHub, VS Code, MySQL, Postman, VirtualBox/VMware, Android Studio

LANGUES
• Francais: Courant (B2)
• Anglais: Technique (B2)  
• Arabe: Langue maternelle (C2)`,

  "show projects": `MY MAIN PROJECTS

1. MITRE ATT&CK Web Pentesting Platform (2025)
   Technologies: React.js, Node.js, MITRE ATT&CK Framework
   Features: Automated reporting, Interactive dashboards,risk calculation,scenario building 
   Status: PFE Project at CPI Algerie

2. E-commerce Website (2023-2025)
   Technologies: React.js, JavaScript
   Features: responsive frontend  e-commerce of cars functionality
   Context: Academic project at ESTIN

3. Educational Security Labs (2023-2025)
   Focus: Phishing simulation, DDoS attack demonstrations
   Purpose: Educational cybersecurity training
   Environment: Controlled lab setup

4. CTF Competitions & Organization
   Participated: NexZero, Hackini (7th place), CSAW, CTFELDjazair 
   Role: Chef Relations Externes at Club NEXUS
   Period: 2022 - Present

5. Network Infrastructure Projects
   MSAN/OLT Configuration at Algerie Telecom
   ZTE Optical Networks Management
   TCP/IP, DNS, DHCP Implementation`,

 
  "nmap scan": `Starting Nmap 7.94 ( https://nmap.org ) at 2025-09-29 14:32 CET
Nmap scan report for ibtissem-portfolio.dev (192.168.1.100)
Host is up (0.00042s latency).

PORT      STATE SERVICE         VERSION
22/tcp    open  ssh             OpenSSH 8.9p1 Ubuntu 3ubuntu0.4
80/tcp    open  http            nginx/1.18.0 (Ubuntu)
443/tcp   open  https           nginx/1.18.0 (Ubuntu)
1337/tcp  open  waste?

ADDITIONAL SCAN RESULTS:
• Host Discovery: 1 host up, 0.42ms average RTT
• OS Detection: Linux 5.4.x|5.8.x (Ubuntu 20.04|22.04)
• Service Detection: 4 services detected

INTERESTING FINDINGS:
• Port 1337: Custom portfolio shell service
• Port 31337: Hidden CTF challenge endpoint
• Port 8080: MITRE ATT&CK dashboard (filtered)
• SSH Banner: "Property of ESTIN Cybersec Lab"

VULNERABILITY ASSESSMENT:
• CVE-2023-XXXX: None found (hardened system)
• Weak passwords: Not detected
• Default credentials: Not present
• Security headers: Properly configured

PENTESTER NOTES:
• Target shows strong security posture
• Evidence of cybersecurity expertise
• CTF flags may be hidden (try 'cat something')

Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds

Scan completed by: Ibtissem Benmessaoud | ESTIN M2 Cybersecurite`,

  "cat flag.txt": `FLAG DISCOVERED!




FLAG: flag{HACK_THE_PORTFOLIO_2025_IBTISSEM_ROCKS}

Congratulations! You found the hidden flag!
You've demonstrated excellent enumeration skills!
Keep hacking and stay curious!

- save this name Ibtissem Benmessaoud, a  Future Cybersecurity Expert :>`,

  "sudo su": `[sudo] password for ibenmessaoud: ********

ROOT ACCESS GRANTED

WARNING: You are now operating with administrative privileges!

Remember: "With great power comes great responsibility"

As a cybersecurity professional, I understand the importance of
responsible disclosure and ethical hacking practices.

Currently learning: Advanced penetration testing techniques
Goal: Become a leading cybersecurity expert in Algeria

root@portfolio:~# whoami
root

root@portfolio:~# echo "Welcome to the matrix, Neo... I mean, Ibtissem!"
Welcome to the matrix, Neo... I mean, Ibtissem!

root@portfolio:~# exit
logout
Connection to portfolio closed.`,
}

export default function Terminal() {
  const [lines, setLines] = useState([
    {
      type: "output",
      content: `Welcome to Ibtissem's Portfolio Terminal v1.0.0

Cybersecurity Engineer | CTF Player
ESTIN M2 Cybersecurite 

Type 'help' to see available commands or start exploring!
`,
    },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])
  
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const typeText = async (text: string, delay: number = 15) => {

    setIsTyping(true)
    const chars = text.split("")
    let currentText = ""

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i]
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: currentText }])
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    setIsTyping(false)
  }

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim().toLowerCase()

    // Add command to history
    setLines((prev) => [...prev, { type: "prompt", content: `ibenmessaoud@portfolio:~$ ${command}` }])

    if (trimmedCommand === "clear") {
      setLines([])
      return
    }

    if (trimmedCommand === "exit") {
      setLines((prev) => [...prev, { type: "output", content: "Thanks for visiting my portfolio! Connection closed." }])
      return
    }

    // Special handling for nmap scan with typing animation
    if (trimmedCommand === "nmap scan" || trimmedCommand.startsWith("nmap")) {
      setLines((prev) => [...prev, { type: "output", content: "" }])
      await typeText(COMMANDS["nmap scan"], 12)
      return
    }

    const output = COMMANDS[trimmedCommand]

    if (output) {
      setLines((prev) => [...prev, { type: "output", content: output }])
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `bash: ${command}: command not found\nTry 'help' to see available commands.` },
      ])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      executeCommand(currentInput)
      setCurrentInput("")
    }
  }

  const getCurrentPrompt = () => {
    return "ibenmessaoud@portfolio:~$ "
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="mx-auto max-w-5xl bg-card border-border">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive"></div>
            <div className="h-3 w-3 rounded-full bg-accent"></div>
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="ml-4 text-sm text-muted-foreground">ibenmessaoud@portfolio: ~</span>
          </div>

          <div
            ref={terminalRef}
            className="h-[600px] overflow-y-auto bg-background p-4 rounded border border-border font-mono text-sm"
          >
            {lines.map((line, index) => (
              <div key={index} className="terminal-line whitespace-pre-wrap">
                {line.type === "prompt" && <span className="terminal-prompt text-primary">{line.content}</span>}
                {line.type === "command" && <span className="terminal-command text-accent">{line.content}</span>}
                {line.type === "output" && <span className="terminal-output text-foreground">{line.content}</span>}
                {line.type === "error" && <span className="terminal-error text-destructive">{line.content}</span>}
              </div>
            ))}

            {!isTyping && (
              <div className="flex items-center">
                <span className="terminal-prompt text-primary">{getCurrentPrompt()}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                  autoFocus
                />
                <span className="terminal-cursor text-primary animate-pulse">█</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            <p>💡 Pro tip: Try 'nmap scan', or 'sudo su' for special features!</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
