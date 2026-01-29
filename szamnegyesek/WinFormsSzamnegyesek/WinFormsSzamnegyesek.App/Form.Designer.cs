using System.Drawing.Interop;

namespace WinFormsSzamnegyesek.App
{
    partial class Form
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Label label00;
        private System.Windows.Forms.Label label01;
        private System.Windows.Forms.Label label02;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label20;
        private System.Windows.Forms.Label label21;
        private System.Windows.Forms.Label label22;
        private System.Windows.Forms.FlowLayoutPanel flowLayoutPanel1;
        private System.Windows.Forms.Button btnA;
        private System.Windows.Forms.Button btnB;
        private System.Windows.Forms.Button btnC;
        private System.Windows.Forms.Button btnD;
        private System.Windows.Forms.Button btnReset;
        private System.Windows.Forms.Button btnCompute;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }
        void ConfigureLabel(System.Windows.Forms.Label lbl)
        {
            lbl.Dock = System.Windows.Forms.DockStyle.Fill;
            lbl.Font = lblFont;
            lbl.TextAlign = align;
            lbl.Margin = new System.Windows.Forms.Padding(0);
        }

        System.Drawing.Font lblFont = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
        System.Drawing.ContentAlignment align = System.Drawing.ContentAlignment.MiddleCenter;

        private void InitializeComponent()
        {
            tableLayoutPanel1 = new TableLayoutPanel();
            label00 = new Label();
            label01 = new Label();
            label02 = new Label();
            label10 = new Label();
            label11 = new Label();
            label12 = new Label();
            label20 = new Label();
            label21 = new Label();
            label22 = new Label();
            flowLayoutPanel1 = new FlowLayoutPanel();
            btnA = new Button();
            btnB = new Button();
            btnC = new Button();
            btnD = new Button();
            btnReset = new Button();
            btnCompute = new Button();
            tableLayoutPanel1.SuspendLayout();
            flowLayoutPanel1.SuspendLayout();
            SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            tableLayoutPanel1.CellBorderStyle = TableLayoutPanelCellBorderStyle.Single;
            tableLayoutPanel1.ColumnCount = 3;
            tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33F));
            tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33F));
            tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.34F));
            tableLayoutPanel1.Controls.Add(label00, 0, 0);
            tableLayoutPanel1.Controls.Add(label01, 1, 0);
            tableLayoutPanel1.Controls.Add(label02, 2, 0);
            tableLayoutPanel1.Controls.Add(label10, 0, 1);
            tableLayoutPanel1.Controls.Add(label11, 1, 1);
            tableLayoutPanel1.Controls.Add(label12, 2, 1);
            tableLayoutPanel1.Controls.Add(label20, 0, 2);
            tableLayoutPanel1.Controls.Add(label21, 1, 2);
            tableLayoutPanel1.Controls.Add(label22, 2, 2);
            tableLayoutPanel1.Location = new Point(16, 16);
            tableLayoutPanel1.Name = "tableLayoutPanel1";
            tableLayoutPanel1.RowCount = 3;
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 33.33F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 33.33F));
            tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 33.34F));
            tableLayoutPanel1.Size = new Size(300, 300);
            tableLayoutPanel1.TabIndex = 0;
            tableLayoutPanel1.Paint += tableLayoutPanel1_Paint;
            // 
            // label00
            // 
            label00.Location = new Point(4, 1);
            label00.Name = "label00";
            label00.Size = new Size(92, 23);
            label00.TabIndex = 0;
            // 
            // label01
            // 
            label01.Location = new Point(103, 1);
            label01.Name = "label01";
            label01.Size = new Size(92, 23);
            label01.TabIndex = 1;
            // 
            // label02
            // 
            label02.Location = new Point(202, 1);
            label02.Name = "label02";
            label02.Size = new Size(94, 23);
            label02.TabIndex = 2;
            // 
            // label10
            // 
            label10.Location = new Point(4, 100);
            label10.Name = "label10";
            label10.Size = new Size(92, 23);
            label10.TabIndex = 3;
            // 
            // label11
            // 
            label11.Location = new Point(103, 100);
            label11.Name = "label11";
            label11.Size = new Size(92, 23);
            label11.TabIndex = 4;
            // 
            // label12
            // 
            label12.Location = new Point(202, 100);
            label12.Name = "label12";
            label12.Size = new Size(94, 23);
            label12.TabIndex = 5;
            // 
            // label20
            // 
            label20.Location = new Point(4, 199);
            label20.Name = "label20";
            label20.Size = new Size(92, 23);
            label20.TabIndex = 6;
            // 
            // label21
            // 
            label21.Location = new Point(103, 199);
            label21.Name = "label21";
            label21.Size = new Size(92, 23);
            label21.TabIndex = 7;
            // 
            // label22
            // 
            label22.Location = new Point(202, 199);
            label22.Name = "label22";
            label22.Size = new Size(94, 23);
            label22.TabIndex = 8;
            // 
            // flowLayoutPanel1
            // 
            flowLayoutPanel1.Controls.Add(btnA);
            flowLayoutPanel1.Controls.Add(btnB);
            flowLayoutPanel1.Controls.Add(btnC);
            flowLayoutPanel1.Controls.Add(btnD);
            flowLayoutPanel1.Controls.Add(btnReset);
            flowLayoutPanel1.Controls.Add(btnCompute);
            flowLayoutPanel1.FlowDirection = FlowDirection.TopDown;
            flowLayoutPanel1.Location = new Point(332, 16);
            flowLayoutPanel1.Name = "flowLayoutPanel1";
            flowLayoutPanel1.Size = new Size(132, 300);
            flowLayoutPanel1.TabIndex = 1;
            flowLayoutPanel1.WrapContents = false;
            // 
            // btnA
            // 
            btnA.Location = new Point(3, 3);
            btnA.Name = "btnA";
            btnA.Size = new Size(120, 36);
            btnA.TabIndex = 0;
            btnA.Text = "A";
            btnA.Click += BtnA_Click;
            // 
            // btnB
            // 
            btnB.Location = new Point(3, 45);
            btnB.Name = "btnB";
            btnB.Size = new Size(120, 36);
            btnB.TabIndex = 1;
            btnB.Text = "B";
            btnB.Click += BtnB_Click;
            // 
            // btnC
            // 
            btnC.Location = new Point(3, 87);
            btnC.Name = "btnC";
            btnC.Size = new Size(120, 36);
            btnC.TabIndex = 2;
            btnC.Text = "C";
            btnC.Click += BtnC_Click;
            // 
            // btnD
            // 
            btnD.Location = new Point(3, 129);
            btnD.Name = "btnD";
            btnD.Size = new Size(120, 36);
            btnD.TabIndex = 3;
            btnD.Text = "D";
            btnD.Click += BtnD_Click;
            // 
            // btnReset
            // 
            btnReset.Location = new Point(3, 171);
            btnReset.Name = "btnReset";
            btnReset.Size = new Size(120, 36);
            btnReset.TabIndex = 4;
            btnReset.Text = "Reset";
            btnReset.Click += BtnReset_Click;
            // 
            // btnCompute
            // 
            btnCompute.Location = new Point(3, 213);
            btnCompute.Name = "btnCompute";
            btnCompute.Size = new Size(120, 36);
            btnCompute.TabIndex = 5;
            btnCompute.Text = "Compute counts";
            btnCompute.Click += BtnCompute_Click;
            // 
            // Form
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(480, 320);
            Controls.Add(tableLayoutPanel1);
            Controls.Add(flowLayoutPanel1);
            Name = "Form";
            Text = "Számnégyesek - 3×3";
            tableLayoutPanel1.ResumeLayout(false);
            flowLayoutPanel1.ResumeLayout(false);
            ResumeLayout(false);
        }
    }
}
