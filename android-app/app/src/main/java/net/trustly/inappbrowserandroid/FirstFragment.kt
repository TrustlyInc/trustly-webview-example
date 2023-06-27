package net.trustly.inappbrowserandroid

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

/**
 * A simple [Fragment] subclass.
 * Use the [FirstFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class FirstFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_first, container, false)
        val button = view.findViewById<Button>(R.id.btnGoToSecondFragment)
        button.setOnClickListener {
            findNavController().navigate(R.id.action_firstFragment_to_secondFragment)
        }
        return view
    }

    companion object {
        @JvmStatic
        fun newInstance() = FirstFragment()
    }
}