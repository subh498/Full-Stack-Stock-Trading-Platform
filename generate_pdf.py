import os
import sys

def build_with_reportlab(output_path):
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#1E3A8A'),
        alignment=TA_CENTER,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#4B5563'),
        alignment=TA_CENTER,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1E40AF'),
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#1F2937'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#374151'),
        leftIndent=15,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1F2937')
    )

    story = []

    # Title
    story.append(Paragraph("Zerodha Clone - Project Information", title_style))
    story.append(Paragraph("Full-Stack Stock Trading Platform (MERN Architecture)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#3B82F6'), spaceAfter=15))

    # Executive Summary
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(Paragraph(
        "This project is a full-stack stock trading platform inspired by <b>Zerodha</b>. "
        "It consists of a marketing front-facing application, a feature-rich trading console (Kite Dashboard Clone), "
        "and a secure Node/Express REST API backed by MongoDB. Users can explore brokerage services, view watchlists, "
        "place buy/sell orders, track live positions, analyze stock holdings, and view asset distributions.",
        body_style
    ))

    # Architecture Breakdown
    story.append(Paragraph("2. System Architecture & Tech Stack", h1_style))
    arch_data = [
        [Paragraph("Module", table_header_style), Paragraph("Technology Stack", table_header_style), Paragraph("Key Responsibilities", table_header_style)],
        [
            Paragraph("<b>Frontend</b><br/>(Main Website)", table_cell_style),
            Paragraph("React.js, React Router, Bootstrap, FontAwesome", table_cell_style),
            Paragraph("Landing page, Products, Pricing, About Us, Support, and user onboarding UI.", table_cell_style)
        ],
        [
            Paragraph("<b>Dashboard</b><br/>(Kite Trading Console)", table_cell_style),
            Paragraph("React.js, Chart.js, React Context, Axios", table_cell_style),
            Paragraph("Watchlist, Buy/Sell modal window, Holdings table, Positions, Funds, and Portfolio charts.", table_cell_style)
        ],
        [
            Paragraph("<b>Backend</b><br/>(REST API Server)", table_cell_style),
            Paragraph("Node.js, Express.js, Mongoose, CORS, Dotenv", table_cell_style),
            Paragraph("API endpoints for orders, holdings, positions, and MongoDB database integration.", table_cell_style)
        ],
        [
            Paragraph("<b>Database</b><br/>(Cloud Storage)", table_cell_style),
            Paragraph("MongoDB Atlas", table_cell_style),
            Paragraph("Collections for Holdings, Positions, and executed Orders.", table_cell_style)
        ]
    ]

    t_arch = Table(arch_data, colWidths=[110, 160, 260])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E40AF')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F8FAFC'), colors.HexColor('#FFFFFF')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 12))

    # Core Features
    story.append(Paragraph("3. Core Features & Capabilities", h1_style))
    features = [
        "<b>Real-Time-Like Watchlist:</b> Live display of market indices (NIFTY 50, SENSEX) and stocks with real-time percentage changes.",
        "<b>Quick Buy/Sell Window:</b> Interactive order execution popup with quantity and limit price inputs.",
        "<b>Holdings & Portfolio Analytics:</b> Detailed portfolio breakdown (Invested vs Current value, Total P&L, and Doughnut asset allocation charts).",
        "<b>Day Positions:</b> Real-time tracking of open intraday (MIS) and overnight (CNC) trading positions.",
        "<b>Funds Overview:</b> Transparent margin calculations showing available trading capital and utilized margin."
    ]
    for feat in features:
        story.append(Paragraph(f"• {feat}", bullet_style))

    story.append(Spacer(1, 8))

    # API Endpoints
    story.append(Paragraph("4. Backend API Endpoints & Data Models", h1_style))
    api_data = [
        [Paragraph("Endpoint", table_header_style), Paragraph("Method", table_header_style), Paragraph("Description", table_header_style)],
        [Paragraph("<code>/allHoldings</code>", table_cell_style), Paragraph("GET", table_cell_style), Paragraph("Fetches all user stock holdings with invested and current values.", table_cell_style)],
        [Paragraph("<code>/allPositions</code>", table_cell_style), Paragraph("GET", table_cell_style), Paragraph("Returns current open intraday and CNC trading positions.", table_cell_style)],
        [Paragraph("<code>/allOrders</code>", table_cell_style), Paragraph("GET", table_cell_style), Paragraph("Retrieves list of all placed orders (order history).", table_cell_style)],
        [Paragraph("<code>/newOrder</code>", table_cell_style), Paragraph("POST", table_cell_style), Paragraph("Creates and saves a new buy/sell order in MongoDB.", table_cell_style)]
    ]
    t_api = Table(api_data, colWidths=[120, 70, 340])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0F766E')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F0FDFA'), colors.HexColor('#FFFFFF')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CCFBF1')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_api)
    story.append(Spacer(1, 12))

    # Project Setup Instructions
    story.append(Paragraph("5. Quick Start / How to Run", h1_style))
    setup_steps = [
        "<b>1. Backend:</b> <code>cd backend && npm install && npm start</code> (Runs on Port 3002)",
        "<b>2. Dashboard:</b> <code>cd dashboard && npm install && npm start</code> (Runs on Port 3001/default)",
        "<b>3. Frontend:</b> <code>cd frontend && npm install && npm start</code> (Runs on Port 3000)",
        "<b>4. Environment Configuration:</b> Configure <code>.env</code> in backend with <code>MONGO_URI</code> and <code>PORT</code>."
    ]
    for step in setup_steps:
        story.append(Paragraph(step, bullet_style))

    doc.build(story)
    print("PDF successfully generated using reportlab at:", output_path)

def build_with_pure_python(output_path):
    """Fallback pure-Python PDF generator without any external dependencies."""
    pdf_lines = []
    
    # Simple multi-page standard PDF 1.4 generator
    # We will write out a clean 2-page document
    
    pages_content = [
        # Page 1
        """
        BT
        /F2 18 Tf
        180 770 Td
        (ZERODHA CLONE - PROJECT INFORMATION) Tj
        ET
        BT
        /F1 10 Tf
        195 752 Td
        (Full-Stack Stock Trading Platform) Tj
        ET
        
        0.2 0.4 0.8 rg
        50 740 500 2 re f
        0 0 0 rg
        
        BT
        /F2 13 Tf
        50 715 Td
        (1. Project Overview) Tj
        ET
        
        BT
        /F1 9.5 Tf
        50 695 Td
        (This project is a comprehensive Full-Stack clone of Zerodha, India's leading stock broker platform.) Tj
        0 -15 Td
        (It provides a complete trading ecosystem divided into three distinct modules:) Tj
        0 -15 Td
        ( - Marketing Website (Frontend): Zerodha landing, pricing, products, and support pages.) Tj
        0 -15 Td
        ( - Trading Console (Dashboard): Kite clone with real-time watchlist, buy window, holdings, and funds.) Tj
        0 -15 Td
        ( - Backend Engine (REST API): Node.js & Express API with MongoDB for order and portfolio persistence.) Tj
        ET
        
        BT
        /F2 13 Tf
        50 595 Td
        (2. Technology Stack & Architecture) Tj
        ET
        
        0.12 0.25 0.69 rg
        50 570 500 20 re f
        1 1 1 rg
        BT
        /F2 9.5 Tf
        60 576 Td
        (Module           Technology Stack                  Key Features) Tj
        ET
        0 0 0 rg
        
        0.95 0.96 0.98 rg
        50 540 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 554 Td
        (Frontend) Tj
        /F1 8.5 Tf
        130 554 Td
        (React.js, Bootstrap, Router) Tj
        270 554 Td
        (Landing pages, Pricing, Product showcase, Support) Tj
        ET
        
        0.90 0.93 0.97 rg
        50 510 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 524 Td
        (Dashboard) Tj
        /F1 8.5 Tf
        130 524 Td
        (React, Chart.js, Axios, CSS) Tj
        270 524 Td
        (Kite console, Watchlist, Buy modal, Portfolio charts) Tj
        ET
        
        0.95 0.96 0.98 rg
        50 480 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 494 Td
        (Backend) Tj
        /F1 8.5 Tf
        130 494 Td
        (Node.js, Express.js, Mongoose) Tj
        270 494 Td
        (REST API, MongoDB models, order processing engine) Tj
        ET
        
        0.90 0.93 0.97 rg
        50 450 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 464 Td
        (Database) Tj
        /F1 8.5 Tf
        130 464 Td
        (MongoDB Atlas) Tj
        270 464 Td
        (Collections: Holdings, Positions, and Orders) Tj
        ET
        
        BT
        /F2 13 Tf
        50 410 Td
        (3. Core Features & Capabilities) Tj
        ET
        
        BT
        /F1 9 Tf
        50 390 Td
        ([+] Market Watchlist: Dynamic stock listings with NIFTY/SENSEX indices and % change.) Tj
        0 -16 Td
        ([+] Buy Action Modal: Order placement window allowing custom stock quantities and prices.) Tj
        0 -16 Td
        ([+] Holdings Management: Portfolio view with investment value, current value, and P&L.) Tj
        0 -16 Td
        ([+] Open Positions: Real-time intraday MIS and CNC position tracking.) Tj
        0 -16 Td
        ([+] Funds Breakdown: Instant margin calculations for equity and commodity segments.) Tj
        0 -16 Td
        ([+] Interactive Charts: Asset allocation doughnut charts and vertical performance bars.) Tj
        ET
        
        BT
        /F1 8 Tf
        260 40 Td
        (Page 1 of 2) Tj
        ET
        """,
        
        # Page 2
        """
        BT
        /F2 13 Tf
        50 770 Td
        (4. Backend REST API Endpoints) Tj
        ET
        
        0.06 0.46 0.43 rg
        50 745 500 20 re f
        1 1 1 rg
        BT
        /F2 9.5 Tf
        60 751 Td
        (Endpoint              Method     Function & Description) Tj
        ET
        0 0 0 rg
        
        0.94 0.99 0.98 rg
        50 715 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 729 Td
        (/allHoldings) Tj
        /F1 9 Tf
        160 729 Td
        (GET) Tj
        220 729 Td
        (Retrieves list of user stock holdings with invested and current values) Tj
        ET
        
        0.88 0.96 0.95 rg
        50 685 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 699 Td
        (/allPositions) Tj
        /F1 9 Tf
        160 699 Td
        (GET) Tj
        220 699 Td
        (Fetches active intraday and open trading positions) Tj
        ET
        
        0.94 0.99 0.98 rg
        50 655 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 669 Td
        (/allOrders) Tj
        /F1 9 Tf
        160 669 Td
        (GET) Tj
        220 669 Td
        (Fetches complete history of placed stock orders) Tj
        ET
        
        0.88 0.96 0.95 rg
        50 625 500 28 re f
        0 0 0 rg
        BT
        /F2 9 Tf
        55 639 Td
        (/newOrder) Tj
        /F1 9 Tf
        160 639 Td
        (POST) Tj
        220 639 Td
        (Receives new order payload (name, qty, price, mode) and saves to DB) Tj
        ET
        
        BT
        /F2 13 Tf
        50 575 Td
        (5. Database Schemas (Mongoose)) Tj
        ET
        
        BT
        /F1 9 Tf
        50 550 Td
        ( - Holdings Schema: name (String), qty (Number), avg (Number), price (Number), net (String), day (String)) Tj
        0 -16 Td
        ( - Positions Schema: product (String), name (String), qty (Number), avg (Number), price (Number), net, day) Tj
        0 -16 Td
        ( - Orders Schema: name (String), qty (Number), price (Number), mode (String: 'BUY'/'SELL')) Tj
        ET
        
        BT
        /F2 13 Tf
        50 460 Td
        (6. How to Run the Project Locally) Tj
        ET
        
        BT
        /F1 9 Tf
        50 435 Td
        (Step 1: Start Backend) Tj
        0 -14 Td
        (   cd backend  -->  npm install  -->  npm start (Runs at http://localhost:3002)) Tj
        0 -20 Td
        (Step 2: Start Dashboard) Tj
        0 -14 Td
        (   cd dashboard  -->  npm install  -->  npm start (Runs at http://localhost:3001)) Tj
        0 -20 Td
        (Step 3: Start Marketing Frontend) Tj
        0 -14 Td
        (   cd frontend  -->  npm install  -->  npm start (Runs at http://localhost:3000)) Tj
        ET
        
        0.2 0.4 0.8 rg
        50 300 500 1.5 re f
        0 0 0 rg
        
        BT
        /F2 11 Tf
        50 275 Td
        (Summary Note:) Tj
        /F1 9 Tf
        50 255 Td
        (This application provides an authentic, modular recreation of Zerodha's trading infrastructure.) Tj
        0 -14 Td
        (It demonstrates end-to-end full stack proficiency including state management, API design, database modeling,) Tj
        0 -14 Td
        (and interactive data visualizations.) Tj
        ET
        
        BT
        /F1 8 Tf
        260 40 Td
        (Page 2 of 2) Tj
        ET
        """
    ]
    
    # Build valid PDF byte structure
    objects = []
    
    # Obj 1: Catalog
    # Obj 2: Pages
    # Obj 3: Font 1 (Helvetica)
    # Obj 4: Font 2 (Helvetica-Bold)
    # Page 1: Obj 5 (Page), Obj 6 (Contents)
    # Page 2: Obj 7 (Page), Obj 8 (Contents)
    
    catalog_id = 1
    pages_id = 2
    font1_id = 3
    font2_id = 4
    
    page_objs = []
    next_id = 5
    for content in pages_content:
        page_id = next_id
        content_id = next_id + 1
        next_id += 2
        page_objs.append((page_id, content_id, content.strip()))
    
    kids_str = " ".join([f"{p[0]} 0 R" for p in page_objs])
    
    body = []
    offsets = {}
    
    def add_object(obj_num, content_str):
        offset = sum(len(b) for b in body)
        offsets[obj_num] = offset
        body.append(f"{obj_num} 0 obj\n{content_str}\nendobj\n".encode('latin1'))

    body.append(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    # 1: Catalog
    add_object(catalog_id, f"<< /Type /Catalog /Pages {pages_id} 0 R >>")
    # 2: Pages
    add_object(pages_id, f"<< /Type /Pages /Kids [{kids_str}] /Count {len(page_objs)} >>")
    # 3: Font Helvetica
    add_object(font1_id, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # 4: Font Helvetica-Bold
    add_object(font2_id, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    
    for page_id, content_id, content_stream in page_objs:
        stream_bytes = content_stream.encode('latin1')
        page_dict = f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 {font1_id} 0 R /F2 {font2_id} 0 R >> >> /Contents {content_id} 0 R >>"
        add_object(page_id, page_dict)
        content_dict = f"<< /Length {len(stream_bytes)} >>\nstream\n{content_stream}\nendstream"
        add_object(content_id, content_dict)
        
    startxref = sum(len(b) for b in body)
    total_objects = next_id
    
    xref_str = f"xref\n0 {total_objects}\n0000000000 65535 f \n"
    for i in range(1, total_objects):
        xref_str += f"{offsets[i]:010d} 00000 n \n"
    
    trailer_str = f"trailer\n<< /Size {total_objects} /Root {catalog_id} 0 R >>\nstartxref\n{startxref}\n%%EOF\n"
    
    body.append(xref_str.encode('latin1'))
    body.append(trailer_str.encode('latin1'))
    
    with open(output_path, "wb") as f:
        f.write(b"".join(body))
    print("Pure-python PDF created at:", output_path)

if __name__ == "__main__":
    out_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Zerodha_Clone_Project_Information.pdf")
    try:
        build_with_reportlab(out_file)
    except ImportError:
        print("reportlab not found, falling back to built-in pure Python PDF generator...")
        build_with_pure_python(out_file)
    except Exception as e:
        print("Error with reportlab:", e, "- falling back to built-in...")
        build_with_pure_python(out_file)
