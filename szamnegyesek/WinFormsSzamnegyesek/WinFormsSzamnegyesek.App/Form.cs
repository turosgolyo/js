namespace WinFormsSzamnegyesek.App
{
    public partial class Form : System.Windows.Forms.Form
    {
        private int[,] table = new int[3, 3];

        public Form()
        {
            InitializeComponent();
            UpdateLabels();
        }

        private void UpdateLabels()
        {
            label00.Text = table[0, 0].ToString();
            label01.Text = table[0, 1].ToString();
            label02.Text = table[0, 2].ToString();

            label10.Text = table[1, 0].ToString();
            label11.Text = table[1, 1].ToString();
            label12.Text = table[1, 2].ToString();

            label20.Text = table[2, 0].ToString();
            label21.Text = table[2, 1].ToString();
            label22.Text = table[2, 2].ToString();
        }

        private void IncrementA()
        {
            table[0, 0]++;
            table[0, 1]++;
            table[1, 0]++;
            table[1, 1]++;
            UpdateLabels();
        }

        private void IncrementB()
        {
            table[0, 1]++;
            table[0, 2]++;
            table[1, 1]++;
            table[1, 2]++;
            UpdateLabels();
        }

        private void IncrementC()
        {
            table[1, 0]++;
            table[1, 1]++;
            table[2, 0]++;
            table[2, 1]++;
            UpdateLabels();
        }

        private void IncrementD()
        {
            table[1, 1]++;
            table[1, 2]++;
            table[2, 1]++;
            table[2, 2]++;
            UpdateLabels();
        }

        private void ResetTable()
        {
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                    table[i, j] = 0;
            UpdateLabels();
        }
        private int[] ComputeCountsFromTable()
        {
            int a = table[0, 0];
            int b = table[0, 2];
            int c = table[2, 0];
            int d = table[2, 2];

            bool ok =
                table[0, 1] == a + b &&
                table[1, 0] == a + c &&
                table[1, 2] == b + d &&
                table[2, 1] == c + d &&
                table[1, 1] == a + b + c + d;

            if (!ok)
                return new int[] { -1 };

            return new int[] { a, b, c, d };
        }

        private void BtnA_Click(object sender, EventArgs e)
        {
            IncrementA();
        }

        private void BtnB_Click(object sender, EventArgs e)
        {
            IncrementB();
        }

        private void BtnC_Click(object sender, EventArgs e)
        {
            IncrementC();
        }

        private void BtnD_Click(object sender, EventArgs e)
        {
            IncrementD();
        }

        private void BtnReset_Click(object sender, EventArgs e)
        {
            ResetTable();
        }

        private void BtnCompute_Click(object sender, EventArgs e)
        {
            int[] result = ComputeCountsFromTable();
            if (result.Length == 1 && result[0] == -1)
            {
                MessageBox.Show("Inconsistent table — result: [-1]", "Compute result", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                MessageBox.Show($"[{result[0]}, {result[1]}, {result[2]}, {result[3]}]", "Compute result", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
